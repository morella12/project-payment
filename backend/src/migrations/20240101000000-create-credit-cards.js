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
      card_number_encrypted: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      cvv_encrypted: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      cardholder_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      expiration_month: {
        type: Sequelize.SMALLINT,
        allowNull: false,
      },
      expiration_year: {
        type: Sequelize.SMALLINT,
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

    await queryInterface.sequelize.query(`
      ALTER TABLE credit_cards
        ADD CONSTRAINT chk_expiration_month CHECK (expiration_month BETWEEN 1 AND 12),
        ADD CONSTRAINT chk_expiration_year CHECK (expiration_year >= 2000);
    `);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('credit_cards');
  },
};
