const shortid = require("shortid");

module.exports = function Accounts({ knexpg }) {
  this.createAccount = ({ email, password, phone_number, salt_key }) =>
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

  this.retrieveAccounts = () => knexpg("accounts").where({ deleted_at: null });

  this.retrieveAccountById = account_id =>
    knexpg("accounts")
      .where({
        id: account_id,
        deleted_at: null
      })
      .first();

  this.verifyIfAccountExistsById = this.retrieveAccountById;

  this.retrieveAccountByEmail = email =>
    knexpg("accounts")
      .where({
        email,
        deleted_at: null
      })
      .first();

  this.retrieveAccountByPhoneNumber = phone_number =>
    knexpg("accounts")
      .where({
        phone_number,
        deleted_at: null
      })
      .first();

  this.verifyIfAccountExistsByEmailAndPhoneNumber = ({ email, phone_number }) =>
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
};
