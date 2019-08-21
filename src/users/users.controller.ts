import { Controller, Get, Post, Put, Body, HttpException, UseGuards, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/users.interface';
import { UsersService } from './users.service'
import { AuthGuard } from '@nestjs/passport';
import { Http2SecureServer } from 'http2';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService){}

	@Get()
	getAll(): Promise<IUser[]> {
		return this.usersService.getAll();
	}

	@UseGuards(AuthGuard('jwt'))
	@Post()
	async create(@Body() createUser: CreateUserDto): Promise<IUser>{
        const user = await this.usersService.findOne(createUser.username);
        if(user){
            throw new HttpException('Unauthorized', 403);
        }
		return this.usersService.create(createUser);
	}

	@UseGuards(AuthGuard('jwt'))
	@Put(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto): Promise<IUser>{
        return this.usersService.update(id, updateUserDto);
	}
	
	@UseGuards(AuthGuard('jwt'))
	@Delete(':id')
    delete(@Param('id') id: string):Promise<IUser>{
        return this.usersService.delete(id);
    }
}
