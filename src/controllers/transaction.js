const Transaction = require("../models/Transaction")
const Account = require("../models/Account")
const db = require("../config/database")

async function amount(req, res) {
  try {
    const { account_id, amount } = req.body
    const transaction_id = req.header("Transaction-Id")

    const [account] = await Account.findOrBuild({ where: { account_id } })

    const transaction = await Transaction.findOne({
      where: { account_id, transaction_id },
    })

    if (!transaction) {
      await Transaction.create({
        account_id,
        amount,
        transaction_id,
      })
      account.balance += amount
      account.transaction_count++
      await account.save()
    } else {
      const change = account.balance - transaction.amount + amount
      account.balance = change
      transaction.amount = amount
      await account.save()
      await transaction.save()
    }

    res.status(200).json({ message: "Transaction created" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function transaction(req, res) {
  try {
    const { transaction_id } = req.params
    const transaction = await Transaction.findOne({
      where: { transaction_id },
    })
    if (!transaction) return res.status(404).json({ message: "Not found" })
    res.send(transaction)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function balance(req, res) {
  try {
    const { account_id } = req.params
    const balance = await Account.findOne({
      where: { account_id },
      attributes: ["balance"],
    })
    if (!balance) return res.status(404).json({ message: "Not found" })
    res.status(200).json(balance)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function max_transaction_volume(req, res) {
  const accounts = await db.query(
    "SELECT  account_id ,transaction_count FROM Accounts WHERE transaction_count = (SELECT MAX(transaction_count) FROM Accounts);",
    {
      model: Account,
      mapToModel: true,
    }
  )

  const result = {
    maxVolume: accounts[0].transaction_count,
    accounts: accounts.map((obj) => obj.account_id),
  }

  res.status(200).json(result)
}

module.exports = {
  amount,
  transaction,
  balance,
  max_transaction_volume,
}
