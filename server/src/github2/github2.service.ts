import { Injectable } from '@nestjs/common';

@Injectable()
export class Github2Service {
  github2(req) {
    if (!req.user) return 'no github2 login';
    else return 'success github2 login';
  }
}
