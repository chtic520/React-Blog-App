import Router from 'koa-better-router';

import * as Admin from '../controllers/admin';

const router = Router({prefix: '/admin'}).loadMethods();

router.get('/', Admin.index);

export default router