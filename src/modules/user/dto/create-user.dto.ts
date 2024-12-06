import { IsString, IsInt, IsEmail, Min, Max, IsNotEmpty, IsEnum } from 'class-validator';
import { UserRole } from 'src/schemas/user.schema';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({message: 'Name is missing!'})
  readonly name: string;

  @IsEmail()
  @IsNotEmpty({message: 'Email is missing!'})
  readonly email: string;

  @IsString()
  @IsNotEmpty({message: 'Password is missing!'})
  readonly password: string;

  @IsInt()
  readonly age: number;

  @IsEnum(UserRole)
  readonly roles: UserRole;
}
