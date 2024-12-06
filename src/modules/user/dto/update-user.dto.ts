import { IsString, IsInt, IsEmail, Min, Max, IsNotEmpty, IsEnum } from 'class-validator';
import { UserRole } from 'src/schemas/user.schema';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({message: 'Name is missing!'})
  readonly name: string;

  @IsEmail()
  @IsNotEmpty({message: 'Email is missing!'})
  readonly email: string;

  @IsInt()
  readonly age: number;

  @IsEnum(UserRole)
  readonly roles: UserRole;
}
