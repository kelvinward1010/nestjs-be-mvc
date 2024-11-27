import { IsString, IsInt, IsEmail, Min, Max, IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty({message: 'Age is missing!'})
  readonly age: number;
}
