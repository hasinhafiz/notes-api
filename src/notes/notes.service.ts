import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private repo: Repository<Note>) { }

  create(title: string, content: string, userId: number) {
    if (!userId) {
      throw new UnauthorizedException;
    }
    const note = this.repo.create({ title, content, userId });
    return this.repo.save(note);
  }
}
