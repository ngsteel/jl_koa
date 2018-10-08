const Koa = require('koa');
const path = require('path');
const router = require('koa-router')();
const render = require('koa-art-template');


const app = new Koa();

//console.log('__dirname = ', __dirname)


render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

/**
 * 系统级中间件
 *
 */
app.use((ctx, next) => {

    ctx.body = '未匹配到任何资源。';

    next();
});


/**
 * 用户处理逻辑
 */
router
    .get('/users/:id',async (ctx, next) => { /* 查看方法 */
        let userInfo = {
            title: '用户信息',
            cname: '许井龙',
            id: ctx.params.id /* 动态URL */
        }

        console.log(ctx.query.key); /* get 查询参数 */

        await ctx.render('user', userInfo); /* 模板渲染 */

        console.log('查看')

    })
    .post('/users', (ctx, next) => { /* 新增方法 */
        // ...
        console.log('新增')
    })
    .put('/users/:id', (ctx, next) => { /* 更新方法 */
        // ...
        console.log('更新')
    })
    .del('/users/:id', (ctx, next) => { /* 删除方法 */
        console.log('删除')
        // ...
    })
    .all('/users/:id', (ctx, next) => {
        // ...
    });


app
    .use(router.routes())
    .use(router.allowedMethods());


app.listen(3000);