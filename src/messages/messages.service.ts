import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IMessage } from './interface/message.interface';

@Injectable()
export class MessagesService {
    constructor(@InjectModel('Message') private readonly messageModel){}

    async getAll(): Promise<IMessage[]>
	{
		const message = await this.messageModel.find();
		return message;
    }

    async create(message: IMessage)
	{
		const newMessage = this.messageModel(message);
		return await newMessage.save();
    }
    
    async delete(id: string): Promise<IMessage>{
        return await this.messageModel.findByIdAndDelete(id);
    }

    async update(id: string, message: IMessage): Promise<IMessage>{
        return await this.messageModel.findByIdAndUpdate(id, message, {new: true});
    }

    async findOne(params):Promise<IMessage>
    { 
        return await this.messageModel.findOne(params);
    }
    
    async find(params):Promise<IMessage>
    {
        return await this.messageModel.find(params).populate('user');
    }
}
