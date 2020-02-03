module.exports = ({ products }) => router =>
  router
    .post(
      "/create",
      async (ctx, next) =>
        await next(
          await products(ctx).createProduct(
            ctx.authParams.user_id,
            ctx.request.fields
          )
        )
    )
    .get(
      "/list",
      async (ctx, next) =>
        await next({
          list: await products(ctx).retrieveAllProducts()
        })
    )
    .get(
      "/:product_id",
      async (ctx, next) =>
        await next({
          product: await products(ctx).retrieveProductById(
            ctx.params.product_id
          )
        })
    )
    .put(
      "/:product_id",
      async (ctx, next) =>
        await next(
          await products(ctx).updateProductById(
            ctx.params.product_id,
            ctx.request.fields
          )
        )
    )
    .delete(
      "/:product_id",
      async (ctx, next) =>
        await next(await products(ctx).deleteProductById(ctx.params.product_id))
    );
