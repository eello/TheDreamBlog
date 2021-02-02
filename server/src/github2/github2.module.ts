import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from 'src/admin/admin.module';
import { Github2Controller } from './github2.controller';
import { Github2Serializer } from './github2.serializer';
import { Github2Service } from './github2.service';
import { Github2Strategy } from './github2.strategy';

@Module({
  imports: [PassportModule.register({ session: true }), AdminModule],
  controllers: [Github2Controller],
  providers: [Github2Service, Github2Strategy, Github2Serializer],
})
export class Github2Module {}
