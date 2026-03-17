import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  create(email: string, password: string) {
    const user = this.repo.create({ email, password }); // Creates new entity
    return this.repo.save(user); // Saves created entity to repository
  }

  async findByEmail(email: string) {
    const foundUser = await this.repo.findOne({ where: { email } });
    return foundUser;
  }
}
