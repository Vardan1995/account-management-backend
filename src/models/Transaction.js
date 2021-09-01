const { DataTypes } = require("sequelize")
const db = require("../config/database")

const Transaction = db.define("Transaction", {
  account_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  transaction_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
})

Transaction.sync().then(() => {
  console.log("table created")
})

module.exports = Transaction
