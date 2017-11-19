const cities = require('cities.json');
const cool = require('cool-ascii-faces');

const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');

const Koa = require('koa');
const app = module.exports = new Koa();

const port = process.env.PORT || 3000;

// middleware
app.use(logger());
app.use(koaBody());

// route definitions
router
    .get('/', magicMirror)
    .post('/cities', search);
app.use(router.routes());

async function magicMirror(ctx) {
    ctx.body = `This is you when you realized this is a mirror: ${cool()}`;
}

async function search(ctx) {
    const searchTerm = ctx.request.body[0];
    ctx.body = cities.filter(city =>
        city.name.includes(searchTerm)
    ).map(city =>
        city.name
    );
}

if (!module.parent) app.listen(port);