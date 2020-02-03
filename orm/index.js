const accounts = require("./accounts");
const users = require("./users");
const products = require("./products");
const contracts = require("./contracts");

module.exports = (...args) => ({
  accounts: accounts(...args),
  users: users(...args),
  products: products(...args),
  contracts: contracts(...args)
});
