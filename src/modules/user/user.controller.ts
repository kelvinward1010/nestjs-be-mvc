import { Body, Controller, Delete, Get, Param, Post, Put, SerializeOptions, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { User, UserRole } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { MongoExceptionFilter } from "src/common/filters/error.filter";
import { createResponse } from "src/common/utils/response.util";
import { ResponseDto } from "src/common/dto/response.dto";
import { RolesGuard } from "src/common/guards/role.guard";
import { BodyCheckInterceptor } from "src/common/interceptors/body-check.interceptor";
import { User as UserDecorator } from 'src/common/decorators/user.decorator';
import { Auth } from "src/common/decorators/auth.decorator";
import { RolesUserGuard } from "src/common/guards/role.guard.user";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ClassSerializerInterceptor } from "../../common/interceptors/class-serializer.interceptor";
import { UserEntity } from "./entities/user.entity";
import { Base64ImagesInterceptor } from "src/common/interceptors/base64-images.interceptor";


@Controller('users')
@UseFilters(MongoExceptionFilter)
@UseGuards(RolesGuard)
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @Auth(UserRole.ADMIN)
    @UseInterceptors(BodyCheckInterceptor, Base64ImagesInterceptor)
    async create(@Body() createUserDto: CreateUserDto, @UserDecorator('name') customName: string): Promise<ResponseDto<User>> { 
        const user = await this.userService.createUser(customName, createUserDto.password, createUserDto.email, createUserDto.age, createUserDto.roles, createUserDto.avatar);
        return createResponse(201, 'success', user); 
    }

    @Get()
    @Auth(UserRole.ADMIN)
    async findAll(): Promise<ResponseDto<User[]>> {
        const users = await this.userService.findAll();
        return createResponse(200, 'success', users);
    }

    @Get(':id')
    @UseGuards(RolesUserGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @SerializeOptions({ type: UserEntity }) 
    async findOne(@Param('id') id: string): Promise<ResponseDto<UserEntity>> {
        const user = await this.userService.findOne(id);
        return createResponse(200, 'success', user);
    }

    // @Get('firstname') async getFirstName(@UserDecorator('email') firstName: string): Promise<ResponseDto<string>> { 
    //     return createResponse(200, 'success', `Hello, ${firstName}`);
    // }

    @Put(':id')
    @UseGuards(RolesUserGuard)
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<ResponseDto<User>> {
        const userUpdate = await this.userService.updateUser(id, updateUserDto.name, updateUserDto.email, updateUserDto.age, updateUserDto.roles, updateUserDto.avatar);
        return createResponse(200, 'success', userUpdate);
    }

    @Delete(':id')
    @Auth(UserRole.ADMIN)
    async remove(@Param('id') id: string): Promise<ResponseDto<User>> { 
        const userDelete = await this.userService.deleteUser(id);
        return createResponse(200, 'success', userDelete);
    }
}