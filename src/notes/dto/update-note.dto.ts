import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateNoteDto {

  @ApiProperty({ example: 'My First Note' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is the content of the note' })
  @IsString()
  content: string;
}
