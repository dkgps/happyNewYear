const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    uid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userEmail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nickname: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    social: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    socialKey: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    disclosureStatus: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    createdAt: {
      allowNull : false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull : false,
      type: Sequelize.DATE,
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "uid" },
        ]
      },
    ]
  });
};
