import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private repo: Repository<Note>) { }

  create(title: string, content: string, userId: number) {
    // if (!userId) {
    //   throw new UnauthorizedException;
    // }
    const note = this.repo.create({ title, content, userId });
    return this.repo.save(note);
  }

  async list(userId: number) {
    // if (!userId) {
    //   throw new UnauthorizedException;
    // }

    const notes = await this.repo.find({ where: { userId } });
    return notes;
  }

  async delete(id: number, userId) {
    // if (!userId) { // Implement guards
    //   throw new UnauthorizedException();
    // }

    const note = await this.repo.findOneBy({ id, userId });

    if (!note) {
      throw new NotFoundException("Note not found!");
    }

    return this.repo.remove(note!);
  }
}
