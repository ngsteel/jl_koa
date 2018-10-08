const Koa = require('koa');
const path = require('path');
const router = require('koa-router')();
const render = require('koa-art-template');


const app = new Koa();

console.log('__dirname = ', __dirname)

render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

// response
app.use((ctx, next) => {

    ctx.body = 'Hello Koa';

    next();
});


router.get('/user/:id', async (ctx) => {
    let userInfo = {
        title: '用户信息',
        cname: '许井龙',
        id: ctx.params.id
    }
    await ctx.render('user', userInfo);
});


app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000);