const utils = require("./utils");
const Users = require("./users");
const Products = require("./products");
const Contracts = require("./contracts");

module.exports = app => {
  const modules = {};
  modules.utils = utils;
  modules.users = new Users(app, modules);
  modules.products = new Products(app, modules);
  modules.contracts = new Contracts(app, modules);
  return modules;
};
