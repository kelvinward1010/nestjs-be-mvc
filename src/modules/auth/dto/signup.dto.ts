import { IsString, IsInt, IsEmail, IsNotEmpty, IsEnum, IsBase64 } from 'class-validator';
import { UserRole } from 'src/schemas/user.schema';

export class SignUpDto {
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

  readonly avatar?: string;
}
