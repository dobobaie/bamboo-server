const moment = require("moment");
const shortid = require("shortid");

const assign = (adminOrUserId, obj) => {
  const object = obj;
  if (adminOrUserId) {
    object["contracts.user_id"] = adminOrUserId;
  }
  return object;
};

module.exports = function Contracts({ knexpg }) {
  this.createContract = ({ user_id, product_id, price }) =>
    knexpg("contracts")
      .insert({
        id: shortid.generate(),
        user_id,
        product_id,
        price
      })
      .returning("*")
      .get(0);

  this.retrieveContracts = adminOrUserId =>
    knexpg("contracts")
      .select(knexpg.raw("*, contracts.id AS id"))
      .innerJoin("products", "contracts.product_id", "=", "products.id")
      .where(
        assign(adminOrUserId, {
          "contracts.deleted_at": null
        })
      );

  this.retrieveContractById = adminOrUserId => id =>
    knexpg("contracts")
      .select(knexpg.raw("*, contracts.id AS id"))
      .innerJoin("products", "contracts.product_id", "=", "products.id")
      .where(
        assign(adminOrUserId, {
          "contracts.id": id,
          "contracts.deleted_at": null
        })
      )
      .first();

  this.retrieveContractByProductId = adminOrUserId => product_id =>
    knexpg("contracts")
      .select(knexpg.raw("*, contracts.id AS id"))
      .innerJoin("products", "contracts.product_id", "=", "products.id")
      .where(
        assign(adminOrUserId, {
          "contracts.product_id": product_id,
          "contracts.deleted_at": null
        })
      )
      .first();

  this.retrieveContractsNameByKeyword = adminOrUserId => keyword =>
    knexpg("contracts")
      .select(knexpg.raw("*, contracts.id AS id"))
      .innerJoin("products", "contracts.product_id", "=", "products.id")
      .where(
        assign(adminOrUserId, {
          "contracts.deleted_at": null
        })
      )
      .andWhere("products.name", "like", `%${keyword}%`);

  this.updateContractById = adminOrUserId => (id, { product_id }) =>
    knexpg("contracts")
      .where(
        assign(adminOrUserId, {
          id,
          deleted_at: null
        })
      )
      .update({
        product_id
      })
      .returning("*")
      .get(0);

  this.deleteContractById = adminOrUserId => id =>
    knexpg("contracts")
      .where(assign(adminOrUserId, { id }))
      .update({
        deleted_at: moment.utc()
      })
      .returning("*")
      .get(0);
};
