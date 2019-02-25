export const index = (ctx, next) => {
  ctx.body = `Welcome to admin index page! Prefix: ${ctx.route.prefix}`;
  return next();
}

export const foo = (ctx, next) => {
  ctx.body = `Welcome to admin foo page! Prefix: ${ctx.route.prefix}`;
  return next();
}