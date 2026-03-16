import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }
  create(userObject: CreateUserDto) {
    const user = this.repo.create(userObject); // Creates new entity
    return this.repo.save(user); // Saves created entity to repository
  }
}
