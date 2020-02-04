module.exports = ({ contracts }) => router =>
  router
    .post(
      "/create",
      async (ctx, next) =>
        // eslint-disable-next-line
        await next(
          await contracts.createContract(ctx)(
            ctx.authParams.user_id,
            ctx.request.fields
          )
        )
    )
    .get(
      "/autocomplete",
      async (ctx, next) =>
        // eslint-disable-next-line
        await next({
          list: await contracts.retrieveContractsNameByKeyword(ctx)(
            ctx.queries.keyword
          )
        })
    )
    .get(
      "/list",
      async (ctx, next) =>
        // eslint-disable-next-line
        await next({
          list: await contracts.retrieveAllContracts(ctx)()
        })
    )
    .get(
      "/:contract_id",
      async (ctx, next) =>
        // eslint-disable-next-line
        await next({
          contract: await contracts.retrieveContractById(ctx)(
            ctx.params.contract_id
          )
        })
    )
    .put(
      "/:contract_id",
      async (ctx, next) =>
        // eslint-disable-next-line
        await next(
          await contracts.updateContractById(ctx)(
            ctx.params.contract_id,
            ctx.request.fields
          )
        )
    )
    .delete(
      "/:contract_id",
      async (ctx, next) =>
        // eslint-disable-next-line
        await next(
          await contracts.deleteContractById(ctx)(ctx.params.contract_id)
        )
    );
