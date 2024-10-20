import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Match } from 'src/utils/decorators/match.decorator';

export class CreateUserRequestDto {
  @ApiProperty({ example: 'Jose' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Gomez' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'user@test.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'user@test.com' })
  @IsString()
  @Match('email', { message: 'Emails must match' })
  confirmMail: string;
}
