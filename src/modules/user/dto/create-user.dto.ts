import { IsString, IsInt, IsEmail, Min, Max, IsEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmpty({message: 'Please enter a valid name'})
  readonly name: string;

  @IsInt()
  @Min(0)
  @Max(120)
  readonly age: number;

  @IsEmail()
  readonly email: string;
}
