import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-github2';
import { ConfigService } from '@nestjs/config';
import { AdminService } from 'src/admin/admin.service';
import { Admin } from 'src/admin/admin.entity';

@Injectable()
export class Github2Strategy extends PassportStrategy(Strategy, 'github2') {
  constructor(
    private readonly configService: ConfigService,
    private readonly adminService: AdminService,
  ) {
    super(configService.get('github2'));
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: CallableFunction,
  ): Promise<any> {
    const { id, username, nodeId, displayName, profileUrl } = profile;
    const findAdmin = await this.adminService.getUsername(id, username);

    /** admin 정보를 저장하기 위한 개발버전 코드 */
    if (process.env.NODE_ENV === 'development') {
      if (findAdmin) done(null, displayName);
      else {
        const newAdmin: Admin = {
          id,
          username,
          node_id: nodeId,
          display_name: displayName,
          profile_url: profileUrl,
        };
        this.adminService.registAdmin(newAdmin);

        done(null, displayName);
      }
    }
    /**/

    /** product 환경에서 admin 로그인 */
    if (process.env.NODE_ENV === 'product') {
      if (findAdmin) done(null, displayName);
      else throw new UnauthorizedException();
    }
  }
}
