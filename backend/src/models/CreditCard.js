'use strict';

const { Model, DataTypes } = require('sequelize');

/**
 * Credit card record.
 */
class CreditCard extends Model {
  static initModel(sequelize) {
    CreditCard.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        cardNumber: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: 'card_number',
        },
        cvv: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: 'cvv',
        },
        cardholderName: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: 'cardholder_name',
        },
        expiration: {
          type: DataTypes.DATE,
          allowNull: false,
          field: 'expiration',
        },
      },
      {
        sequelize,
        modelName: 'CreditCard',
        tableName: 'credit_cards',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );

    return CreditCard;
  }
}

module.exports = CreditCard;
