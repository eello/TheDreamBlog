import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { Github2Guard } from './github2.guard';

@Controller('github2')
export class Github2Controller {
  @ApiExcludeEndpoint()
  @Get('login')
  @UseGuards(new Github2Guard())
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async github2Login() {}

  @ApiExcludeEndpoint()
  @Get('login/callback')
  @UseGuards(new Github2Guard())
  github2LoginCallback(@Request() req) {
    const { user } = req;
    if (user) return 'github login success';
    else return 'github login fail';
  }

  @ApiExcludeEndpoint()
  @Get('logout')
  github2Logout(@Request() req) {
    req.logOut();
  }
}
