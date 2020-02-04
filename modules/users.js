const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const privateKey = fs.readFileSync(`${__dirname}/../pem/private.key`);

module.exports = function Users({ config, orm }) {
  this.createUser = () => async ({
    first_name,
    last_name,
    email,
    password,
    phone_number
  }) => {
    const verifyAccount = await orm.accounts.verifyIfAccountExistsByEmailAndPhoneNumber(
      { email, phone_number }
    );
    if (verifyAccount) {
      throw new Error("user_email_or_phone_number_already_exists");
    }

    const salt_key = await bcrypt.genSalt(8);
    const passwordHashed = await bcrypt.hash(password, salt_key);
    const account = await orm.accounts.createAccount({
      email,
      phone_number,
      password: passwordHashed,
      salt_key
    });

    await orm.users.createUser({
      account_id: account.id,
      first_name,
      last_name
    });
  };

  this.retrieveUserById = () => async user_id =>
    orm.users.retrieveUserById(user_id);

  this.updateUserById = () => async (user_id, payload) => {
    if (Object.keys(payload).length !== 0) {
      await orm.users.updateUserById(user_id, payload);
    }
  };

  this.deleteUserById = () => async user_id => {
    await orm.users.deleteUserById(user_id);
  };

  this.retrieveAllUsers = () => async () => orm.users.retrieveUsers();

  this.loginUser = () => async ({ email, password }) => {
    const account = await orm.accounts.retrieveAccountByEmail(email);
    if (!account) {
      throw new Error("user_does_not_exist");
    }

    const passwordHashed = await bcrypt.hash(password, account.salt_key);
    if (account.password !== passwordHashed) {
      throw new Error("user_does_not_exist");
    }

    const user = await orm.users.retrieveUserByAccountId(account.id);
    if (!user) {
      throw new Error("user_does_not_exist");
    }

    const payload = {
      account_id: account.id,
      user_id: user.id,
      email: account.email,
      phone_number: account.phone_number,
      first_name: user.first_name,
      is_admin: account.is_admin,
      is_verified: account.is_verified,
      created_at: new Date().getTime()
    };

    const signOptions = {
      issuer: config.corp.name,
      subject: config.corp.email,
      audience: config.corp.url,
      expiresIn: config.jwt.expiresIn,
      algorithm: config.jwt.algorithm
    };

    const access_token = jwt.sign(payload, privateKey, signOptions);

    return {
      access_token
    };
  };
};
