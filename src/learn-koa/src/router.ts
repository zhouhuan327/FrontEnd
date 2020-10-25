import Router from '@koa/router';

import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';

const router = new Router();

// auth 相关的路由
router.post('/auth/login', AuthController.login);
router.post('/auth/register', AuthController.register);

const protectedRouter = new Router();
// users 相关的路由
protectedRouter.get('/users', UserController.listUsers);
protectedRouter.get('/users/:id', UserController.showUserDetail);
protectedRouter.put('/users/:id', UserController.updateUser);
protectedRouter.delete('/users/:id', UserController.deleteUser);

export { router, protectedRouter };
