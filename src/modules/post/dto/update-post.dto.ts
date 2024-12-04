import { IsNotEmpty, IsOptional, IsString } from "class-validator";



export class UpdatePostDto{
    @IsString()
    @IsNotEmpty({message: 'Title is missing!'})
    title: string;

    @IsString()
    @IsNotEmpty({message: 'Content is missing!'})
    content: string;

    //@IsArray()
    images?: {
        url: string,
        public_id: string,
    }[];

    @IsString()
    @IsNotEmpty({message: 'ownerId is missing!'})
    ownerId: string;

    //@IsOptional()
    newImages?: {
        url: string,
        public_id: string,
    }[];
}