const shortid = require("shortid");

module.exports = ({ knexpg }) => {
  const createAccount = ({ email, password, phone_number, salt_key }) =>
    knexpg("accounts")
      .insert({
        id: shortid.generate(),
        email,
        password,
        phone_number,
        salt_key
      })
      .returning("*")
      .get(0);

  const retrieveAccounts = () => knexpg("accounts").where({ deleted_at: null });

  const retrieveAccountById = account_id =>
    knexpg("accounts")
      .where({
        id: account_id,
        deleted_at: null
      })
      .first();

  const retrieveAccountByEmail = email =>
    knexpg("accounts")
      .where({
        email,
        deleted_at: null
      })
      .first();

  const retrieveAccountByPhoneNumber = phone_number =>
    knexpg("accounts")
      .where({
        phone_number,
        deleted_at: null
      })
      .first();

  const verifyIfAccountExistsByEmailAndPhoneNumber = ({
    email,
    phone_number
  }) =>
    knexpg("accounts")
      .where({
        phone_number,
        deleted_at: null
      })
      .orWhere({
        email,
        deleted_at: null
      })
      .first();

  return {
    createAccount,
    retrieveAccounts,
    retrieveAccountById,
    retrieveAccountByPhoneNumber,
    retrieveAccountByEmail,
    verifyIfAccountExistsById: retrieveAccountById,
    verifyIfAccountExistsByEmailAndPhoneNumber
  };
};
