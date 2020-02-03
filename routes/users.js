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
        await next(await users(ctx).createUser(ctx.request.fields))
    )
    .get(
      "/list",
      mustAdmin(),
      async (ctx, next) =>
        await next({
          list: await users(ctx).retrieveAllUsers()
        })
    )
    .post(
      "/login",
      async (ctx, next) =>
        await next(await users(ctx).loginUser(ctx.request.fields))
    )
    .get(
      "/:user_id",
      mustUserIdOrAdmin(),
      async (ctx, next) =>
        await next({
          user: await users(ctx).retrieveUserById(ctx.params.user_id)
        })
    )
    .put(
      "/:user_id",
      mustUserIdOrAdmin(),
      async (ctx, next) =>
        await next(
          await users(ctx).updateUserById(
            ctx.params.user_id,
            ctx.request.fields
          )
        )
    )
    .delete(
      "/:user_id",
      mustUserIdOrAdmin(),
      async (ctx, next) =>
        await next(await users(ctx).deleteUserById(ctx.params.user_id))
    );
