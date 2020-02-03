const Default = require("./default");
const users = require("./users");
const products = require("./products");
const contracts = require("./contracts");

module.exports = (...args) =>
  Object.assign(
    {},
    Default(...args),
    users(...args),
    products(...args),
    contracts(...args)
  );
