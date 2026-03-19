import { Body, Controller, Post, Session, Get, Delete, Param, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiCookieAuth, ApiBody } from '@nestjs/swagger';

@ApiTags('notes')
@ApiCookieAuth()
@Controller('notes')
@UseGuards(AuthGuard) // Use AuthGuard
export class NotesController {
  constructor(private notesService: NotesService) { }

  @Post()
  @ApiOperation({ summary: 'Create new note' })
  @ApiBody({ type: CreateNoteDto })
  @ApiResponse({ status: 201, description: 'Note created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  createNote(@Body() body: CreateNoteDto, @Session() session: any) {
    return this.notesService.create(body.title, body.content, session.userId);
  }

  @Get()
  @ApiOperation({ summary: 'List all notes belonging to user' })
  @ApiResponse({ status: 200, description: 'List of notes' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  listNotes(@Session() session: any) {
    return this.notesService.list(session.userId);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete note by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Note ID' })
  @ApiResponse({ status: 200, description: 'Note deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Note not found' })
  deleteNote(@Param('id') id: number, @Session() session: any) {
    return this.notesService.delete(id, session.userId);
  }
}
