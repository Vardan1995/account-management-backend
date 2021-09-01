const db = require("./config/database")
const app = require("./app")
const PORT = process.env.PORT || 8000

db.sync({ force: true })
  .then(() => {
    console.log("\n*************************************")
    console.log("Database connected")
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on PORT ${PORT}`)
      console.log("*************************************\n")
    })
  })
  .catch((ex) => {
    console.error(`Fatal error: ${ex}`)
    process.exit(1)
  })
