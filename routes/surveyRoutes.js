const mongoose = require('mongoose');
const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const template = require('../services/emailTemplates/template');
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('Thank you for your opinion');
  });
  app.post('/api/surveys/webhooks', async (req, res) => {
    console.log('Response');
    try {
      const events = req.body.map(({ url, email, sg_event_id }) => {
        const pathname = new URL(url).pathname;
        const p = new Path('/api/surveys/:surveyId/:choice');
        const { surveyId, choice } = p.test(pathname);
        if (surveyId && choice) {
          return {
            email,
            surveyId,
            choice,
            sg_event_id 
          };
        }
      });
      const compactEvents = events.filter(event => !!event);
      //const uniqueEvents = [new Set(compactEvents)];
      const uniqueEvents = _.uniqWith(compactEvents, (a, b) => {
        return a.email === b.email && a.surveyId === b.surveyId;
      });
      console.log(uniqueEvents);
      res.send({})
    } catch (e) {
      console.log(e);
    }
  });
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    try {
      const { title, subject, body, recipients } = req.body;
      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients
          .split(',')
          .map(email => ({ email: email.trim() })),
        _user: req.user.id,
        dateSent: Date.now(),
      });
      const mailer = await new Mailer(survey, template(survey));
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (e) {
      res.status(422).send(e);
      console.log(e);
    }
  });
};
