module.exports = ({ contracts }) => router =>
  router
    .post(
      "/create",
      async (ctx, next) =>
        await next(
          await contracts(ctx).createContract(
            ctx.authParams.user_id,
            ctx.request.fields
          )
        )
    )
    .get(
      "/autocomplete",
      async (ctx, next) =>
        await next({
          list: await contracts(ctx).retrieveContractsNameByKeyword(
            ctx.queries.keyword
          )
        })
    )
    .get(
      "/list",
      async (ctx, next) =>
        await next({
          list: await contracts(ctx).retrieveAllContracts()
        })
    )
    .get(
      "/:contract_id",
      async (ctx, next) =>
        await next({
          contract: await contracts(ctx).retrieveContractById(
            ctx.params.contract_id
          )
        })
    )
    .put(
      "/:contract_id",
      async (ctx, next) =>
        await next(
          await contracts(ctx).updateContractById(
            ctx.params.contract_id,
            ctx.request.fields
          )
        )
    )
    .delete(
      "/:contract_id",
      async (ctx, next) =>
        await next(
          await contracts(ctx).deleteContractById(ctx.params.contract_id)
        )
    );
