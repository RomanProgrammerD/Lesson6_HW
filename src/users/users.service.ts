import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/users.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
	constructor(@InjectModel('User') private readonly userModel){}
	async create(user: IUser)
	{
		const newUser = this.userModel(user);
		return await newUser.save();
	}
	async getAll(): Promise<IUser[]>
	{
		const user = await this.userModel.find();
		return user;
    }
    
    async findOne(username: string):Promise<IUser>
    {
        const user = await this.userModel.findOne({username});
		return user;
	}
	
	async update(id: string, user: IUser): Promise<IUser>{
        return await this.userModel.findByIdAndUpdate(id, user, { new: true });
	}
	
	async delete(id: string): Promise<IUser>{
        return await this.userModel.findByIdAndDelete(id);
    }
	
}