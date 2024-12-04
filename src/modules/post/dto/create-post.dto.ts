import { IsString, IsNotEmpty } from 'class-validator';


export class CreatePostDto {
  @IsString()
  @IsNotEmpty({message: 'Title is missing!'})
  readonly title: string;

  @IsString()
  @IsNotEmpty({message: 'Content is missing!'})
  readonly content: string;

  //@IsArray()
  readonly images: {
    url: string,
    public_id: string,
  }[];

  @IsString()
  @IsNotEmpty({message: 'ownerId is missing!'})
  readonly ownerId: string;
}
