import * as argon2 from 'argon2';
import { User } from '../entity/user';
import { getManager } from 'typeorm';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';
import { UnauthorizedException } from '../exceptions';
export default class AuthController {
  public static async login(ctx: any) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository
      .createQueryBuilder()
      .where({ name: ctx.request.body.name })
      .addSelect('User.password')
      .getOne();
    if (!user) {
      throw new UnauthorizedException('用户名不存在');
    } else if (await argon2.verify(user.password, ctx.request.body.password)) {
      ctx.status = 200;
      ctx.body = { token: jwt.sign({ id: user.id }, JWT_SECRET) };
    } else {
      throw new UnauthorizedException('密码错误');
    }
  }
  public static async register(ctx: any) {
    const userRepository = getManager().getRepository(User);
    const body = ctx.request.body;
    console.log(body);
    const newUser = new User();
    newUser.name = body.name;
    newUser.email = body.email;
    newUser.password = await argon2.hash(body.password);

    const user = await userRepository.save(newUser);
    ctx.status = 201;
    ctx.body = user;
  }
}
