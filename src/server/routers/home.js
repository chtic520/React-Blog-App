import Router from 'koa-better-router';

import * as Home from '../controllers/home';

const router = Router().loadMethods();

router.get('/', Home.index);
router.get('/foo', Home.foo);
router.get('/del', Home.del);

export default router