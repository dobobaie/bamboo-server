const Joi = require("@hapi/joi");

const defaultRefs = require("./refs/default");

const refs = {
  infos_product: Joi.object({
    id: Joi.string(),
    name: Joi.string(),
    estimated_price: Joi.number()
  }).label("infos_product"),
  infos_product_is_required: Joi.object({
    name: Joi.string().required(),
    estimated_price: Joi.number().required()
  })
    .required()
    .label("infos_product_is_required")
};

const models = () => ({
  "POST/products/create": {
    queries: defaultRefs.token,
    body: refs.infos_product_is_required,
    response: defaultRefs.status.description("Create a new product")
  },
  "GET/products/list": {
    queries: defaultRefs.token,
    response: Joi.object({
      list: Joi.array()
        .items(refs.infos_product)
        .required()
    })
      .required()
      .description("Retrieve a list of products")
  },
  "GET/products/:product_id": {
    queries: defaultRefs.token,
    response: Joi.object({
      product: refs.infos_product.default(null)
    }).description("Retrieve a product")
  },
  "PUT/products/:product_id": {
    queries: defaultRefs.token,
    body: refs.infos_product,
    response: defaultRefs.status.description(`Update the product's information`)
  },
  "DELETE/products/:product_id": {
    queries: defaultRefs.token,
    response: defaultRefs.status.description("Delete a product")
  }
});

module.exports = models;
