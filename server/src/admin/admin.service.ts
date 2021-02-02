import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  /** admin 정보를 저장하기 위한 개발버전 코드 */
  registAdmin(admin: Admin) {
    this.adminRepository.save(admin);
  }
  /** */

  getUsername(id: string, username: string): Promise<Admin> {
    return this.adminRepository.findOne({ id, username });
  }
}
