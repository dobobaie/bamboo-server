const Joi = require("@hapi/joi");

const defaultRefs = require("./refs/default");

const refs = {
  infos_contract_autocomplete: Joi.object({
    id: Joi.string(),
    name: Joi.string()
  }).label("infos_contract_autocomplete"),
  infos_contract: Joi.object({
    id: Joi.string(),
    name: Joi.string(),
    product_id: Joi.string(),
    price: Joi.string()
  }).label("infos_contract"),
  infos_contract_is_required: Joi.object({
    product_id: Joi.string().required()
  })
    .required()
    .label("infos_contract_is_required")
};

const models = () => ({
  "POST/contracts/create": {
    queries: defaultRefs.token,
    body: refs.infos_contract_is_required,
    response: defaultRefs.status.description("Create a new contract")
  },
  "GET/contracts/list": {
    queries: defaultRefs.token,
    response: Joi.object({
      list: Joi.array()
        .items(refs.infos_contract)
        .required()
    })
      .required()
      .description("Retrieve a list of contracts")
  },
  "GET/contracts/autocomplete": {
    queries: defaultRefs.token,
    response: Joi.object({
      list: Joi.array()
        .items(refs.infos_contract_autocomplete)
        .required()
    })
      .required()
      .description(
        "Retrieve a list of contracts name by potential occurrences via a keyword"
      )
  },
  "GET/contracts/:contract_id": {
    queries: defaultRefs.token,
    response: Joi.object({
      contract: refs.infos_contract.default(null)
    }).description("Retrieve a contract")
  },
  "PUT/contracts/:contract_id": {
    queries: defaultRefs.token,
    body: refs.infos_contract,
    response: defaultRefs.status.description(
      `Update the contract's information`
    )
  },
  "DELETE/contracts/:contract_id": {
    queries: defaultRefs.token,
    response: defaultRefs.status.description("Delete a contract")
  }
});

module.exports = models;
