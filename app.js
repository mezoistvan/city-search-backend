let cities = require('cities.json');
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

// sort and map cities once, during startup to avoid runtime sorting
cities = cities
    .map(city => {
        return {
            lowerCaseName: city.name.toLowerCase(),
            displayName: city.name,
            country: city.country
        };
    }).sort((a, b) => {
    if (a.lowerCaseName < b.lowerCaseName)
        return -1;
      if (a.lowerCaseName > b.lowerCaseName)
        return 1;
      return 0;
    });

async function search(ctx) {
    console.log('Searched for:', ctx.request.body);
    const searchTerm = ctx.request.body.toLowerCase();

    const startsWithIt = cities.filter(city => city.lowerCaseName.indexOf(searchTerm) === 0);
    const includesIt = cities.filter(city => city.lowerCaseName.indexOf(searchTerm) > 0);
    ctx.body = startsWithIt
        .map(cityObj => [cityObj.displayName, cityObj.country])
        .concat(
            includesIt.map(cityObj => [cityObj.displayName, cityObj.country])
        ).slice(0, 100);
}

if (!module.parent) app.listen(port);