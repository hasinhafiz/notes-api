import { ApiProperty } from "@nestjs/swagger";

export class NoteResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'My First Note' })
  title: string;

  @ApiProperty({ example: "This is the content of the note" })
  content: string
}
