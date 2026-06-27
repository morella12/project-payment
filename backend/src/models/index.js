'use strict';

const { sequelize } = require('../config/database');
const CreditCard = require('./CreditCard');

CreditCard.initModel(sequelize);

module.exports = {
  sequelize,
  CreditCard,
};
