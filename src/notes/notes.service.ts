import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { Repository } from 'typeorm';
import { NoteResponseDto } from './dto/note-response.dto';

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private repo: Repository<Note>) { }

  // Response mapping function
  private toResponseDto(note: Note): NoteResponseDto {
    return {
      id: note.id,
      title: note.title,
      content: note.content,
    }
  }

  async create(title: string, content: string, userId: number): Promise<NoteResponseDto> {
    // if (!userId) {
    //   throw new UnauthorizedException;
    // }
    const note = this.repo.create({ title, content, userId });
    const saved = await this.repo.save(note);

    return this.toResponseDto(saved);
  }

  async list(userId: number) {
    // if (!userId) {
    //   throw new UnauthorizedException;
    // }
    const notes = await this.repo.find({ where: { userId } });
    return notes.map(note => this.toResponseDto(note));
  }

  async delete(id: number, userId) {
    // if (!userId) { // Implement guards
    //   throw new UnauthorizedException();
    // }

    const note = await this.repo.findOneBy({ id, userId });

    if (!note) {
      throw new NotFoundException("Note not found!");
    }

    // return this.repo.remove(note!);
    this.repo.remove(note);
    return { message: 'Note deleted' };
  }
}
