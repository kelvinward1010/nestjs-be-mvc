import { Exclude, Expose, Transform } from 'class-transformer';
import { UserRole } from 'src/schemas/user.schema';

export class UserEntity {
  id: number;
  name: string;
  email: string;
  age: number;

  @Exclude()
  password: string;

  @Expose()
  get fullName(): string {
    return `${this.name}`;
  }

  @Transform(({ value }) => value)
  roles: UserRole;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
