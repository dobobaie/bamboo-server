module.exports = token => async (ctx, next) => {
  if (
    ![ctx.query.token, ctx.headers["x-authorisation-token"]].includes(token)
  ) {
    throw new Error("invalid_token");
  }
  await next();
};
