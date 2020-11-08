// src/server.ts
import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { createConnection } from 'typeorm';
import 'reflect-metadata';
import jwt from 'koa-jwt';
import { router, protectedRouter } from './router';
import { JWT_SECRET } from './constants';
import { logger } from './logger';

createConnection()
  .then(() => {
    // 初始化 Koa 应用实例
    const app = new Koa();

    // 注册中间件
    app.use(logger());
    app.use(cors());
    app.use(bodyParser());
    // 错误处理
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        // 只返回 JSON 格式的响应
        ctx.status = err.status || 500;
        ctx.body = { message: err.message };
      }
    });
    // 响应用户请求
    app.use(router.routes()).use(router.allowedMethods());
    // jwt中间件
    app.use(jwt({ secret: JWT_SECRET }).unless({ method: 'GET' }));
    app.use(protectedRouter.routes()).use(router.allowedMethods());

    // 运行服务器
    app.listen(3000);
  })
  .catch((err: string) => console.log('TypeORM connection error:', err));
