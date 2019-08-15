const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/key');
const app = express();

require('./models/Survey');
require('./models/User');


const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const surveyRoutes = require('./routes/surveyRoutes');


require('./services/passport');

mongoose.connect(keys.MONGODB_ATLAS, { useNewUrlParser: true });

app.use(bodyParser.json());

app.use(
  cookieSession({ maxAge: 30 * 24 * 60 * 60 * 1000, keys: [keys.cookieKey] }),
);

app.use(passport.initialize());

app.use(passport.session());

authRoutes(app);
paymentRoutes(app);
surveyRoutes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
