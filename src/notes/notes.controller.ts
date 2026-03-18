import { Body, Controller, Post, Session } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) { }

  @Post()
  createNote(@Body() body: CreateNoteDto, @Session() session: any) {
    return this.notesService.create(body.title, body.content, session.userId);
  }
}
