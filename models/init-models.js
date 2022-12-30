const DataTypes = require("sequelize").DataTypes;
const _user = require("./user");
const _message = require("./message");

function initModels(sequelize) 
{
  let message = _message(sequelize, DataTypes);
  let user = _user(sequelize, DataTypes);
  
  return {
    user,
    message,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
