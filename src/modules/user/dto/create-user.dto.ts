import { IsString, IsInt, IsEmail, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsInt()
  @Min(0)
  @Max(120)
  readonly age: number;

  @IsEmail()
  readonly email: string;
}
