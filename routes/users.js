const mustAdmin = require("../middlewares/mustAdmin");

const mustUserIdOrAdmin = () => async (ctx, next) => {
  if (
    ctx.authParams.userIdOrAdmin &&
    ctx.authParams.userIdOrAdmin !== ctx.params.user_id
  ) {
    throw new Error("invalid_authorization_token");
  }
  await next();
};

module.exports = ({ users }) => router =>
  router
    .post(
      "/create",
      async (ctx, next) =>
        // eslint-disable-next-line
        await next(await users.createUser(ctx)(ctx.request.fields))
    )
    .get(
      "/list",
      mustAdmin(),
      async (ctx, next) =>
        // eslint-disable-next-line
        await next({
          list: await users.retrieveAllUsers(ctx)()
        })
    )
    .post(
      "/login",
      async (ctx, next) =>
        // eslint-disable-next-line
        await next(await users.loginUser(ctx)(ctx.request.fields))
    )
    .get(
      "/:user_id",
      mustUserIdOrAdmin(),
      async (ctx, next) =>
        // eslint-disable-next-line
        await next({
          user: await users.retrieveUserById(ctx)(ctx.params.user_id)
        })
    )
    .put(
      "/:user_id",
      mustUserIdOrAdmin(),
      async (ctx, next) =>
        // eslint-disable-next-line
        await next(
          await users.updateUserById(ctx)(
            ctx.params.user_id,
            ctx.request.fields
          )
        )
    )
    .delete(
      "/:user_id",
      mustUserIdOrAdmin(),
      async (ctx, next) =>
        // eslint-disable-next-line
        await next(await users.deleteUserById(ctx)(ctx.params.user_id))
    );
