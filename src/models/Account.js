const { DataTypes } = require("sequelize")
const db = require("../config/database")

const Account = db.define("Account", {
  account_id: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    allowNull: false,
  },
  transaction_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
})

Account.sync().then(() => {
  console.log("table created")
})
module.exports = Account
