export const index = async (ctx, next) => {
  await ctx.render('front/index', {
    title: 'api首页',
    name: 'api首页'
  });
  return next();
}

export const foo = (ctx, next) => {
  ctx.body = `Welcome to api foo page! Prefix: ${ctx.route.prefix}`;
  return next();
}