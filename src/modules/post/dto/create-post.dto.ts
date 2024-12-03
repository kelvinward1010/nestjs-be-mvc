import { IsString, IsNotEmpty } from 'class-validator';


export class CreatePostDto {
  @IsString()
  @IsNotEmpty({message: 'Title is missing!'})
  readonly title: string;

  @IsString()
  @IsNotEmpty({message: 'Content is missing!'})
  readonly content: string;

  @IsString()
  @IsNotEmpty({message: 'Image is missing!'})
  readonly image: string;

  @IsString()
  @IsNotEmpty({message: 'ownerId is missing!'})
  readonly ownerId: string;
}
