const Koa = require('koa');
const KoaBody = require('koa-body');
const Router = require('@koa/router');
const fetch = require('isomorphic-fetch');
const serve = require('koa-static');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

app.use(cors({origin: '*'}));
app.use(serve('public'));

router.get('/list', KoaBody(), async (ctx) => {
	const res = await fetch(`https://dog.ceo/api/breeds/list`);
  const data = await res.json();
	ctx.set('Content-Type', 'application/json');
	ctx.body = data;
});

router.get('/:breed', KoaBody(), async (ctx) => {
	const userBreed = ctx.request.url.slice(1);
	const res = await fetch(`https://dog.ceo/api/breed/${userBreed}/images/random`);
  const data = await res.json();
	ctx.set('Content-Type', 'application/json');
	ctx.body = data;
});

app.use(router.routes());

module.exports = app;
