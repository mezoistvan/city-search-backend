const cities = require('cities.json');
const cool = require('cool-ascii-faces');

const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');
const cors = require('koa2-cors');

const Koa = require('koa');
const app = module.exports = new Koa();

const port = process.env.PORT || 3000;

// middleware
app.use(logger());
app.use(koaBody());
app.use(cors({
    origin: (ctx) => {
        if (['https://shrouded-peak-89769.herokuapp.com', 'http://localhost:4200'].includes(ctx.header.origin)) {
            return ctx.header.origin;
        }
        return false;
    },
    methods: 'POST'
}));

// route definitions
router
    .get('/', magicMirror)
    .post('/cities', search);
app.use(router.routes());

async function magicMirror(ctx) {
    ctx.body = `There is nothing here. Except this coolface: ${cool()}`;
}

async function search(ctx) {
    const searchTerm = ctx.request.body;
    console.log('Searched for:', searchTerm);
    ctx.body = cities.filter(city =>
        city.name.includes(searchTerm)
    ).map(city =>
        city.name
    ).sort();
}

if (!module.parent) app.listen(port);