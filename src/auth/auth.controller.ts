import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/User.dto';
import {
  sendErrorResponse,
  sendResponse,
} from 'src/common/sendResponse.common';
import { LoginDataDto } from './dtos/Login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // POST Signup
  @Post('signup') // auth/signup
  @UsePipes(new ValidationPipe())
  async userSignup(@Body() signupData: SignupDto) {
    try {
      const userCreated = await this.authService.signup(signupData);
      
      if (!userCreated.success) {
        return sendErrorResponse({
          statusCode: userCreated?.statusCode,
          success: userCreated?.success,
          error: userCreated?.message,
        });
      }
      return sendResponse({
        statusCode: userCreated?.statusCode,
        success: userCreated?.success,
        message: userCreated?.message,
        data: userCreated?.data,
      });
    } catch (error) {
      
      return sendErrorResponse({
        statusCode: 400,
        success: false,
        error: error.toString(),
      });
    }
  }

  // POST Login
  @Post('login')
  @UsePipes(new ValidationPipe())
  async userLogin(@Body() loginData: LoginDataDto){
    try {
      
      const userLoggedIn = await this.authService.login(loginData);
      if(!userLoggedIn?.success){
        return sendErrorResponse({
          statusCode: userLoggedIn?.statusCode,
          success: userLoggedIn?.success,
          error: userLoggedIn?.message
        })
      }
      return sendResponse({
          statusCode: userLoggedIn?.statusCode,
          success: userLoggedIn?.success,
          message: userLoggedIn?.message,
          data: userLoggedIn?.data,
      })
    } catch (error) {
      return  sendErrorResponse({
        statusCode: 400,
        success: false,
        message: error.toString(),
      });
    }
  }
  // POST Refresh Token
}
