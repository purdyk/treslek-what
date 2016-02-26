var log = require('logmagic').local('treslek.plugins.what');
var config = require('./config.json');
var whatReg = /what/;
var Random = require('random-js');
var engine = Random.engines.mt19937().autoSeed();

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

  if (config.channels.indexOf(to) == -1) {
    callback();
    return;
  }

  for (var i = 0; i < config.users.length; i++) {
    if (channelUsers[to][config.users[i]]) {
      var what = Random.pick(engine, config.whats);
      bot.say(to, user + ": " + what);
    }
  }

  callback();

}

exports.Plugin = What;