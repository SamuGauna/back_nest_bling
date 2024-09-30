import { Injectable } from '@nestjs/common';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './users.model';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async findByEmail(email: string): Promise<DocumentType<User>> {
    return this.userModel.findOne({ email });
  }
}
