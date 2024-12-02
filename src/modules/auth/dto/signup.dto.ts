import { IsString, IsInt, IsEmail, IsNotEmpty } from 'class-validator';

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
  @IsNotEmpty({message: 'Age is missing!'})
  readonly age: number;
}
