const Koa = require("koa");
const convert = require("koa-convert");
const koaBody = require("koa-better-body");
const cors = require("koa-cors");
const boom = require("boom");

const router = require("./lib/koa-router")();

const errors = require("./app/errors");

const jsonContentTypeMiddleware = require("./middlewares/jsonContentType");
const responseTimeMiddleware = require("./middlewares/responseTime");
const requestIdMiddleware = require("./middlewares/requestId");
const requestIpMiddleware = require("./middlewares/requestIp");
const errorsMiddleware = require("./middlewares/errors");
const loggerMiddleware = require("./middlewares/logger");
const timeoutMiddleware = require("./middlewares/timeout");
const parseQueryMiddleware = require("./middlewares/parseQuery");
const parseAccessTokenMiddleware = require("./middlewares/parseAccessToken");
const mustAccessMiddleware = require("./middlewares/mustAccess");
const mustAuthMiddleware = require("./middlewares/mustAuth");

const usersRoute = require("./routes/users");
const productsRoute = require("./routes/products");
const contractsRoute = require("./routes/contracts");

module.exports = ({ config, orm, gerJs, logger }, modules) => {
  const app = new Koa();

  app.use(errorsMiddleware({ errors, logger }));
  app.use(convert(cors()));
  app.use(convert(koaBody()));
  app.use(parseQueryMiddleware());
  app.use(parseAccessTokenMiddleware({ orm }));
  app.use(responseTimeMiddleware());
  app.use(requestIdMiddleware());
  app.use(requestIpMiddleware());
  app.use(loggerMiddleware({ logger }));
  app.use(timeoutMiddleware(config.rest_api_timeout));
  app.use(jsonContentTypeMiddleware());
  app.use(gerJs.middleware(router));

  app.use(
    router
      .focus("/users", usersRoute(modules))
      .focus("/products", mustAuthMiddleware(), productsRoute(modules))
      .focus("/contracts", mustAuthMiddleware(), contractsRoute(modules))
      .get(
        "/swagger",
        mustAccessMiddleware(config.access_token),
        gerJs.expose()
      )
      .get("/health")
      .get("/")
      .get("*", ctx => ctx.throw(boom.notFound()))
      .routes()
  );

  app.use(
    router.allowedMethods({
      throw: true,
      notImplemented: () => boom.notImplemented(),
      methodNotAllowed: () => boom.methodNotAllowed()
    })
  );

  return app;
};
