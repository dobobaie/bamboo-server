const utils = require("./utils");
const users = require("./users");
const products = require("./products");
const contracts = require("./contracts");

module.exports = app => {
  const modules = {};
  modules.utils = utils;
  modules.users = users(app, modules);
  modules.products = products(app, modules);
  modules.contracts = contracts(app, modules);
  return modules;
};
