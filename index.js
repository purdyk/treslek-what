var log = require('logmagic').local('treslek.plugins.what');
var config = require('./config.json');
var whatReg = /what/;

var channelUsers = {}

var What = function () {
  this.hooks = ['what'];
};

What.prototype.what = function (bot, to, from, msg, callback) {
  matches = msg.match(whatReg);

  if (!channelUsers[to]) {
    channelUsers[to] = {}
  }
  channelUsers[to][from] = 1;

  if (!matches) {
    callback();
    return;
  }

  if (config.channels.indexOf(to) === -1) {
    callback();
    return;
  }

  log.info("Found a what on an enabled channel: " + to);

  for (var i = 0; i < config.users.length; i++) {
    var user = config.users[i];
    if (channelUsers[to][user]) {
      var what = config.whats[Math.floor(Math.random() * config.whats.length)];
      bot.say(to, user + ": " + what);
    }
  }

  callback();
}

exports.Plugin = What;