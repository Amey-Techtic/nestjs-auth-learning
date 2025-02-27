import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({global: true, secret: '1234'}),
    MongooseModule.forRoot('mongodb://127.0.0.1/nestjs-auth'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
