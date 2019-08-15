
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default emails => {
  const invalidEmailsArray = emails
    .replace(/\s/g, '') // Remove all white space characters (needs to be "greedy" to not stop after finding the first match)
    .replace(/,,+/g, ',') // Remove any surplus commas from anywhere in the string
    .replace(/(^,|,$)/g, '') // Remove a comma (if present) from the start or end of the string
    .split(',')
    .map(email => email.trim())
    .filter(email => !emailRegex.test(email));
  if (invalidEmailsArray.length) {
    return `These emails are invalid: ${invalidEmailsArray.join(', ')}`;
  }
  return;
};
