module.exports = ({ orm }) => ctx => {
  const createProduct = async (user_id, { name, estimated_price }) => {
    await orm.products.createProduct({
      user_id,
      name,
      estimated_price
    });
  };

  const retrieveAllProducts = async () =>
    await orm.products.retrieveProducts(ctx.authParams.adminOrUserId);

  const retrieveProductById = async product_id =>
    await orm.products.retrieveProductById(ctx.authParams.adminOrUserId)(
      product_id
    );

  const updateProductById = async (product_id, payload) => {
    if (Object.keys(payload).length !== 0) {
      await orm.products.updateProductById(ctx.authParams.adminOrUserId)(
        product_id,
        payload
      );
    }
  };

  const deleteProductById = async product_id => {
    const contract = await orm.contracts.retrieveContractByProductId(
      ctx.authParams.adminOrUserId
    )(product_id);
    if (contract) {
      throw new Error("invalid_delation_contract_attached_to_product_id");
    }
    await orm.products.deleteProductById(ctx.authParams.adminOrUserId)(
      product_id
    );
  };
  return {
    createProduct,
    retrieveProductById,
    updateProductById,
    deleteProductById,
    retrieveAllProducts
  };
};
