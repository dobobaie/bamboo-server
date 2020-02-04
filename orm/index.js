const Accounts = require("./accounts");
const Users = require("./users");
const Products = require("./products");
const Contracts = require("./contracts");

module.exports = (...args) => ({
  accounts: new Accounts(...args),
  users: new Users(...args),
  products: new Products(...args),
  contracts: new Contracts(...args)
});
