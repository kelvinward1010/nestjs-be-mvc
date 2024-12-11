import { Exclude, Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { UserRole } from 'src/schemas/user.schema';

export class UserEntity {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  age: number;

  @Exclude()
  password: string;

  @Expose()
  get fullName(): string {
    return `${this.name}`;
  }

  @Expose()
  @Transform(({ value }) => value + ' ok')
  roles: UserRole;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
