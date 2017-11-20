const cities = require('cities.json');
const cool = require('cool-ascii-faces');

const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');
const cors = require('koa-cors');

const Koa = require('koa');
const app = module.exports = new Koa();

const port = process.env.PORT || 3000;

// middleware
app.use(logger());
app.use(koaBody());
app.use(cors());

// route definitions
router
    .get('/', magicMirror)
    .post('/cities', search);
app.use(router.routes());

async function magicMirror(ctx) {
    let line = cool();
    line.padStart(Math.floor((22 - line.length) / 2), ' ')
    line.padEnd(22, ' ');

    ctx.body = `
    THE MIRACULOUS MAGIC MIRROR
    _________________________
    (, ______________________ )
    | |                      ||
    | |                      ||  
    | |                      ||  
    | |                      ||  
    | |                      ||  
    | |                      ||  
    | |${line}||  
    | |                      ||  
    | |                      ||  
    | |                      ||  
    | |                      ||  
    | |                      ||  
    | |                      ||  
    | |______________________||  
.---('________________________)--.
|____          __________       _|
 |___|   -o-  |       |__|  -o- | 
 |___|   -o-  |       |__|  -o- | 
     |________|       |__|______| 
    `;
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