import { modelOptions, prop, Severity } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Role } from '../utils/enums/role.enum';

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: {
    timestamps: true,
    toObject: {
      getters: true,
      virtuals: false,
    },
  },
})
export class User {
  _id: ObjectId;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ enum: Role, type: () => [String] })
  roles: Role[];

  @prop()
  password?: string;
}
