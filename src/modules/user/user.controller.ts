import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UniqueEmailFilter } from "src/common/filters/unique-email.filter";


@Controller('users')
@UseFilters(UniqueEmailFilter)
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

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: CreateUserDto
    ): Promise<User> {
        return this.userService.updateUser(id, updateUserDto.name, updateUserDto.age, updateUserDto.email);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<User> { 
        return this.userService.deleteUser(id);
    }
}