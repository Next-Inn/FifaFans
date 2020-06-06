'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_uuid: DataTypes.UUID,
    follower_uuid: DataTypes.UUID,
    blocked: DataTypes.BOOLEAN,
  }, {});
  Follower.associate = function(models) {
    // associations can be defined here
  };
  return Follower;
};