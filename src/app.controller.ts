import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return "";
  }

  @Get('/set-cookie')
  async setCookie(@Res() res: any) {
    res
      .header('Set-Cookie', 'queue=1; Max-Age=30; HttpOnly;')
      .json({ message: 'Cookie set' });
  }

  @Get('/get-cookie')
  async getCookie(@Req() req: any) {
    const cookie = req.headers.cookie;
    if(!cookie) {
      return {
        message: 'Cookie not found',
        queue: null,
      };
    }

    const parsedCookie = cookie.split(';').find((c: string) => c.includes('queue='));
    console.log('queue', parsedCookie);
    console.log('queue', cookie);
    return {
      message: 'Cookie get',
      queue: parsedCookie ? parsedCookie.split('=')[1] : null,
    };
  }
}
