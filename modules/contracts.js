module.exports = function Contracts({ orm }) {
  this.createContract = ({ authParams }) => async (user_id, { product_id }) => {
    const contract = await orm.contracts.retrieveContractByProductId(
      authParams.adminOrUserId
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

  this.retrieveAllContracts = ({ authParams }) => async () =>
    orm.contracts.retrieveContracts(authParams.adminOrUserId);

  this.retrieveContractById = ({ authParams }) => async contract_id =>
    orm.contracts.retrieveContractById(authParams.adminOrUserId)(contract_id);

  this.retrieveContractsNameByKeyword = ({ authParams }) => async keyword => {
    await orm.contracts.retrieveContractsNameByKeyword(
      authParams.adminOrUserId
    )(keyword);
  };

  this.updateContractById = ({ authParams }) => async (
    contract_id,
    payload
  ) => {
    if (Object.keys(payload).length !== 0) {
      await orm.contracts.updateContractById(authParams.adminOrUserId)(
        contract_id,
        payload
      );
    }
  };

  this.deleteContractById = ({ authParams }) => async contract_id => {
    await orm.contracts.deleteContractById(authParams.adminOrUserId)(
      contract_id
    );
  };
};
