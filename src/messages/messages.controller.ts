import { Controller, Post, Body, Delete, Param, Put, UseGuards, Get } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { IMessage } from './interface/message.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsersGuard } from 'src/common/guards/user.custom.guard';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService){}

    @Get()
    async get():Promise<IMessage[]>{
      return this.messagesService.getAll();
    }

    @Get('/user/:user')
    getByUserId(@Param('user') user: string): Promise<IMessage>{
      return this.messagesService.find({user});
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() createUser: CreateMessageDto): Promise<IMessage>{
		return this.messagesService.create(createUser);
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: string,@Body() updateMessageDto: CreateMessageDto): Promise<IMessage>{
      return this.messagesService.update(id, updateMessageDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), UsersGuard)
    async delete(@Param('id') id: string):Promise<IMessage>{
        return this.messagesService.delete(id);
    }
}
