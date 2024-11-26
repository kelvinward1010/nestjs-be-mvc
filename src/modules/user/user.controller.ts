import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/schemas/user.schema";


@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @Post() 
    async create(@Body() createUserDto: { name: string, age: number, email: string }): Promise<User> { 
        return this.userService.createUser(createUserDto.name, createUserDto.age, createUserDto.email); 
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}