module.exports = ({ orm }) => ctx => {
  const createContract = async (user_id, { product_id }) => {
    const contract = await orm.contracts.retrieveContractByProductId(
      ctx.authParams.adminOrUserId
    )(product_id);
    if (contract) {
      throw new Error("product_id_have_already_a_contract");
    }
    await orm.contracts.createContract({
      user_id,
      product_id,
      price: "30"
    });
  };

  const retrieveAllContracts = async () =>
    await orm.contracts.retrieveContracts(ctx.authParams.adminOrUserId);

  const retrieveContractById = async contract_id =>
    await orm.contracts.retrieveContractById(ctx.authParams.adminOrUserId)(
      contract_id
    );

  const retrieveContractsNameByKeyword = async keyword =>
    await orm.contracts.retrieveContractsNameByKeyword(
      ctx.authParams.adminOrUserId
    )(keyword);

  const updateContractById = async (contract_id, payload) => {
    if (Object.keys(payload).length !== 0) {
      await orm.contracts.updateContractById(ctx.authParams.adminOrUserId)(
        contract_id,
        payload
      );
    }
  };

  const deleteContractById = async contract_id => {
    await orm.contracts.deleteContractById(ctx.authParams.adminOrUserId)(
      contract_id
    );
  };

  return {
    createContract,
    retrieveAllContracts,
    retrieveContractsNameByKeyword,
    retrieveContractById,
    updateContractById,
    deleteContractById
  };
};
