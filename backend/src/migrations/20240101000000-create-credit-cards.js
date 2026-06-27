'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('credit_cards', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },
      card_number: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      cvv: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      cardholder_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      expiration: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });

    await queryInterface.addIndex('credit_cards', ['created_at'], {
      name: 'idx_credit_cards_created_at',
    });

  },

  async down(queryInterface) {
    await queryInterface.dropTable('credit_cards');
  },
};
