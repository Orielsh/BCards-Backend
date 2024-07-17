const morgan = require('morgan');
const chalk = require('chalk');

morgan.token('dev_timestamp', function (req, res) {
  return new Date().toLocaleString();
});

morgan.token("date", function (req, res) {
  return new Date().toLocaleDateString().replaceAll("/", "-");
});

morgan.token("res_body", function (req, res) {
  if(res.body)
    return JSON.parse(res.body).message;
  return "Not found";
});

function getColorByStatusCode(code) {
  if (code >= 400) return chalk.red(code); // Errors
  if (code >= 300) return chalk.yellow(code); // Redirects
  return chalk.green(code); // Success
}

function consoleFormat(tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    getColorByStatusCode(tokens.status(req, res)),
    tokens['response-time'](req, res), 'ms',
    tokens.res(req, res, 'content-length'), '-',
    tokens.dev_timestamp(),
  ].join(" ");
}

function fileFormat(tokens, req, res) {
  return [
    tokens.date(),
    tokens.status(req, res),
    tokens.res_body(req, res),
  ].join(" ");
}

module.exports = { morgan, consoleFormat, fileFormat };