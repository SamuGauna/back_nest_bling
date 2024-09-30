import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Role } from '../../utils/enums/role.enum';

export class LoginResponseDto {
  @ApiProperty({ example: 'user@test.com' })
  email: string;

  @Type(() => String)
  @ApiProperty({ example: '61d433863260b40e79f87db1' })
  _id: ObjectId;

  @ApiProperty({ enum: Role, isArray: true })
  roles: Role[];

  @ApiProperty()
  token: string;
}
