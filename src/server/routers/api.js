import Router from 'koa-better-router';

import * as Api from '../controllers/api';

const router = Router({prefix: '/api'}).loadMethods();

router.get('/', Api.index);

router.get('/foo', Api.foo);

export default router