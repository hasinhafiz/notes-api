import { Body, Controller, Post, Session, Get, Delete, Param } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) { }

  @Post()
  createNote(@Body() body: CreateNoteDto, @Session() session: any) {
    return this.notesService.create(body.title, body.content, session.userId);
  }

  @Get()
  listNotes(@Session() session: any) {
    return this.notesService.list(session.userId);
  }

  @Delete('/:id')
  deleteNote(@Param('id') id: number, @Session() session: any) {
    return this.notesService.delete(id, session.userId);
  }
}
