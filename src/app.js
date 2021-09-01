const express = require("express")
const morgan = require("morgan")

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use("/", require("./routes/transaction"))
app.use("*", (req, res) => {
  res.status(405).send("not found")
})

module.exports = app
