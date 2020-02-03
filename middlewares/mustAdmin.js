module.exports = () => async (ctx, next) => {
  if (!ctx.authParams.is_admin) {
    throw new Error("invalid_authorization");
  }
  await next();
};
