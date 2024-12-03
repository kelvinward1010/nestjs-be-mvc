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
  @Min(6)
  @Max(50)
  @IsNotEmpty({message: 'Password is missing!'})
  readonly password: string;

  @IsInt()
  @Min(0)
  @Max(120)
  readonly age: number;

  @IsEnum(UserRole)
  readonly role: UserRole;
}
