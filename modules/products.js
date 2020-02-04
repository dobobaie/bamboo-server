module.exports = function Products({ orm }) {
  this.createProduct = () => async (user_id, { name, estimated_price }) => {
    await orm.products.createProduct({
      user_id,
      name,
      estimated_price
    });
  };

  this.retrieveAllProducts = ({ authParams }) => async () =>
    orm.products.retrieveProducts(authParams.adminOrUserId);

  this.retrieveProductById = ({ authParams }) => async product_id =>
    orm.products.retrieveProductById(authParams.adminOrUserId)(product_id);

  this.updateProductById = ({ authParams }) => async (product_id, payload) => {
    if (Object.keys(payload).length !== 0) {
      await orm.products.updateProductById(authParams.adminOrUserId)(
        product_id,
        payload
      );
    }
  };

  this.deleteProductById = ({ authParams }) => async product_id => {
    const contract = await orm.contracts.retrieveContractByProductId(
      authParams.adminOrUserId
    )(product_id);
    if (contract) {
      throw new Error("invalid_delation_contract_attached_to_product_id");
    }
    await orm.products.deleteProductById(authParams.adminOrUserId)(product_id);
  };
};
