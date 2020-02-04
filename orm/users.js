const moment = require("moment");
const shortid = require("shortid");

module.exports = function Users({ knexpg }) {
  this.createUser = ({ first_name, last_name, account_id }) =>
    knexpg("users")
      .insert({
        id: shortid.generate(),
        first_name,
        last_name,
        account_id
      })
      .returning("*")
      .get(0);

  this.retrieveUsers = () =>
    knexpg("users")
      .innerJoin("accounts", "users.account_id", "=", "accounts.id")
      .where({ "users.deleted_at": null });

  this.retrieveUserById = user_id =>
    knexpg("users")
      .where({
        id: user_id,
        deleted_at: null
      })
      .first();

  this.retrieveUserByAccountId = account_id =>
    knexpg("users")
      .where({
        account_id,
        deleted_at: null
      })
      .first();

  this.updateUserById = (
    user_id,
    { first_name, last_name, email, password, phone_number }
  ) =>
    knexpg("users")
      .where({
        id: user_id,
        deleted_at: null
      })
      .update({
        first_name,
        last_name,
        email,
        password,
        phone_number
      })
      .returning("*")
      .get(0);

  this.deleteUserById = user_id =>
    knexpg("users")
      .where({
        id: user_id
      })
      .update({
        deleted_at: moment.utc()
      })
      .returning("*")
      .get(0);
};
