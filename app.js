const cities = require('cities.json');

const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');

const Koa = require('koa');
const app = module.exports = new Koa();

// middleware
app.use(logger());
app.use(koaBody());

// route definitions
router.post('/cities', search);
app.use(router.routes());

async function search(ctx) {
    const searchTerm = ctx.request.body[0];
    console.log(searchTerm);
    // return cities.filter(function(city) {
    //     return city.name.includes(searchTerm)
    // });
    ctx.body = cities.filter(function(city) {
        return city.name.includes(searchTerm)
    }).map(function(city) {
        return city.name;
    });
}

if (!module.parent) app.listen(3000);