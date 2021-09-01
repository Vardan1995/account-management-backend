const Joi = require("joi")

function validateTransaction(req, res, next) {
  if (!req.is("application/json")) return res.status(415).send("not found")
  const schema = Joi.object({
    amount: Joi.number().required(),
    account_id: Joi.string().min(1).max(55).required(),
  })

  const { error } = schema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  next()
}
module.exports = validateTransaction
