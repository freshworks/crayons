const alert = require('cli-alerts');

module.exports = (message) => {
  alert({
    type: `${message.type}`,
    name: `${message.name}`,
    msg: `${message.msg}`,
  });
};
