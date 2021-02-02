import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class Github2Serializer extends PassportSerializer {
  constructor() {
    super();
  }

  serializeUser(user: string, done: CallableFunction) {
    done(null, user);
  }

  async deserializeUser(user: string, done: CallableFunction) {
    done(null, user);
  }
}
