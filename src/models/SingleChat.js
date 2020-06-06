'use strict';
module.exports = (sequelize, DataTypes) => {
  const SingleChat = sequelize.define('SingleChat', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    sender_uuid: DataTypes.UUID,
    recipient_uuid: DataTypes.UUID,
    parent_uuid: DataTypes.UUID,
    message: DataTypes.TEXT,
    deleted_at: DataTypes.DATE
  }, {});
  SingleChat.associate = function(models) {
    // associations can be defined here
    SingleChat.belongsTo(models.User, {
      onDelete: 'CASADE',
			foreignKey: 'sender_uuid'
    })
    SingleChat.belongsTo(models.User, {
      onDelete: 'CASADE',
			foreignKey: 'recipient_uuid'
    })
  };
  return SingleChat;
};
