const express = require("express")
const router = express.Router()
const validateTransaction = require("../middlewares/validator")

const controller = require("../controllers/transaction")

router.get("/ping", (req, res) => {
  res.send("pong")
})
router.post("/amount", validateTransaction, controller.amount)
router.get("/transaction/:transaction_id", controller.transaction)
router.get("/balance/:account_id", controller.balance)
router.get("/max_transaction_volume", controller.max_transaction_volume)

module.exports = router
