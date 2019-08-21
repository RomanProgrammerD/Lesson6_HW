import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'; 
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import config from './config/keys';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [MongooseModule.forRoot(config.mongoURL), AuthModule, UsersModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService, /*{
    provide: APP_GUARD,
    useClass: RolesGuard,
  },*/
],
})
export class AppModule {}
