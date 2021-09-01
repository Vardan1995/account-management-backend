const { Sequelize } = require("sequelize")

module.exports = new Sequelize("test-db", "username", "password", {
  dialect: "sqlite",
  host: "./dev.sqlite",
  define: {
    timestamps: false,
  },
})
