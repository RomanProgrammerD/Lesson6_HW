import { Controller, Get, Post, Request, UseGuards, Body} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { HttpException } from '@nestjs/common';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users/users.service';

@Controller('api')
export class AppController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @Post('login')
  async login(@Body() user: any){
    const userOne = await this.usersService.findOne(user.username);
    if(!userOne){
      throw new HttpException('Not found', 404);
    }
    else return this.authService.login(user);
  }
  @Post('register')
  async register(@Body() user){
    const userFind = await this.usersService.findOne(user.username);
    const { password = '' } = user;
    if(userFind){
      throw new HttpException('User has already existed', 400);
    }
    else if(password.length < 5 || password.length > 8){
      throw new HttpException('Wrong password', 400);
    }
    else {
      const userOne = await this.usersService.create(user);
      return await userOne;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() request){
    return request.user;
  }
}
