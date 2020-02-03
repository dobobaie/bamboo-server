const Promise = require("bluebird");
const KoaRouter = require("koa-router");

module.exports = options => {
  const router = KoaRouter(options);
  router.focus = (...args) => {
    const prefix = args.shift();
    const routes = args.pop();
    const middlewares = args || [];
    const fakeRouter = KoaRouter(options).prefix(prefix);
    const stack = routes(fakeRouter).stack;
    stack.map(route => {
      route.path = route.path[route.path.length - 1] === '/'
        ? route.path.substring(0, route.path.length - 1)
        : route.path;
      route.stack = [...args, ...route.stack];
      router.stack.push(route);
    });
    return router;
  };
  return router;
};
