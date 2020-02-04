const moment = require("moment");
const shortid = require("shortid");

const assign = (adminOrUserId, obj) => {
  const object = obj;
  if (adminOrUserId) {
    object["products.user_id"] = adminOrUserId;
  }
  return object;
};

module.exports = function Products({ knexpg }) {
  this.createProduct = ({ user_id, name, estimated_price }) =>
    knexpg("products")
      .insert({
        id: shortid.generate(),
        user_id,
        name,
        estimated_price
      })
      .returning("*")
      .get(0);

  this.retrieveProducts = adminOrUserId =>
    knexpg("products").where(
      assign(adminOrUserId, {
        deleted_at: null
      })
    );

  this.retrieveProductById = adminOrUserId => id =>
    knexpg("products")
      .where(
        assign(adminOrUserId, {
          id,
          deleted_at: null
        })
      )
      .first();

  this.updateProductById = adminOrUserId => (id, { name, estimated_price }) =>
    knexpg("products")
      .where(
        assign(adminOrUserId, {
          id,
          deleted_at: null
        })
      )
      .update({
        name,
        estimated_price
      })
      .returning("*")
      .get(0);

  this.deleteProductById = adminOrUserId => id =>
    knexpg("products")
      .where(assign(adminOrUserId, { id }))
      .update({
        deleted_at: moment.utc()
      })
      .returning("*")
      .get(0);
};
