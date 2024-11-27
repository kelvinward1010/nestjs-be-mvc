import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { MongoExceptionFilter } from "src/common/filters/error.filter";


@Controller('users')
@UseFilters(MongoExceptionFilter)
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @Post() 
    async create(@Body() createUserDto: { name: string, password: string, email: string, age: number }): Promise<User> { 
        return this.userService.createUser(createUserDto.name, createUserDto.password, createUserDto.email, createUserDto.age); 
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: CreateUserDto
    ): Promise<User> {
        return this.userService.updateUser(id, updateUserDto.name, updateUserDto.password, updateUserDto.email, updateUserDto.age);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<User> { 
        return this.userService.deleteUser(id);
    }
}