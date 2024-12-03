import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User, UserRole } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { MongoExceptionFilter } from "src/common/filters/error.filter";
import { createResponse } from "src/common/utils/response.util";
import { ResponseDto } from "src/common/dto/response.dto";
import { RolesGuard } from "src/common/guards/role.guard";
import { BodyCheckInterceptor } from "src/common/interceptors/body-check.interceptor";


@Controller('users')
@UseFilters(MongoExceptionFilter)
@UseGuards(RolesGuard)
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @UseInterceptors(BodyCheckInterceptor)
    async create(@Body() createUserDto: { name: string, password: string, email: string, age: number, role: UserRole }): Promise<ResponseDto<User>> { 
        const user = await this.userService.createUser(createUserDto.name, createUserDto.password, createUserDto.email, createUserDto.age, createUserDto.role);
        return createResponse(201, 'success', user); 
    }

    @Get()
    async findAll(): Promise<ResponseDto<User[]>> {
        const users = await this.userService.findAll();
        return createResponse(200, 'success', users);
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ResponseDto<User>> {
        const user = await this.userService.findOne(id);
        return createResponse(200, 'success', user);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: CreateUserDto
    ): Promise<ResponseDto<User>> {
        const userUpdate = await this.userService.updateUser(id, updateUserDto.name, updateUserDto.password, updateUserDto.email, updateUserDto.age, updateUserDto.role);
        return createResponse(200, 'success', userUpdate);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<ResponseDto<User>> { 
        const userDelete = await this.userService.deleteUser(id);
        return createResponse(200, 'success', userDelete);
    }
}