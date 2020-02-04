module.exports = ({ products }) => router =>
  router
    .post(
      "/create",
      async (ctx, next) =>
        // eslint-disable-next-line
        await next(
          await products.createProduct(ctx)(
            ctx.authParams.user_id,
            ctx.request.fields
          )
        )
    )
    .get(
      "/list",
      async (ctx, next) =>
        // eslint-disable-next-line
        await next({
          list: await products.retrieveAllProducts(ctx)()
        })
    )
    .get(
      "/:product_id",
      async (ctx, next) =>
        // eslint-disable-next-line
        await next({
          product: await products.retrieveProductById(ctx)(
            ctx.params.product_id
          )
        })
    )
    .put(
      "/:product_id",
      async (ctx, next) =>
        // eslint-disable-next-line
        await next(
          await products.updateProductById(ctx)(
            ctx.params.product_id,
            ctx.request.fields
          )
        )
    )
    .delete(
      "/:product_id",
      async (ctx, next) =>
        // eslint-disable-next-line
        await next(await products.deleteProductById(ctx)(ctx.params.product_id))
    );
