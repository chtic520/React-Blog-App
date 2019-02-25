import Blog from '../models/blog';

export const index = async (ctx, next) => {
  let blogs = await Blog.find({});

  await ctx.render('front/index', {
    title: '网站首页',
    name: '首页',
    blogs: blogs
  });
  return next();
}

export const foo = async (ctx, next) => {
  let blog = new Blog({
    title: Date.now() + 'title',
    body: Date.now() + 'body'
  });

  await blog.save().then(data => {
    ctx.redirect('/');
  }).catch(err => {
    ctx.body = err;
  });

  return next();
}

export const del = async (ctx, next) => {
  await Blog.remove({});

  ctx.redirect('/');

  return next();
}