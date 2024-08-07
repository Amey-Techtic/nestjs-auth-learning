import { Injectable } from '@nestjs/common';
import { SignupDto } from './dtos/User.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as jwt from "jsonwebtoken";
import { LoginDataDto } from './dtos/Login.dto';


@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userService: Model<User>){}
    async signup(signupData: SignupDto){
         try {
            const {name, email, password} = signupData;
            const isEmailExists = await this.userService.findOne({email: email});

            if(isEmailExists){
                return {
                    statusCode: 400,
                    success: false,
                    message: "Email already exists."
                }
            }
            //here while hasing, if two new users select or register same password, then two different hashed passowrd will be generated
            const hashedPassword = await bcrypt.hash(password, 10);  
            // const newUser = new this.userService(signupData);
            const userSaved = await this.userService.create({
                name,
                email,
                password: hashedPassword,
            }); 
            if(!userSaved){
                return{
                    statusCode: 400,
                    success: false,
                    message: "Unable to create new user.",                    
                }
            } 
            return{
                statusCode: 200,
                success: true,
                message: "User created successfully.",
                data: userSaved,
            }
         } catch (error) {
            
            return{
                statusCode: 500,
                success: false,
                message: error.toString(),                    
            }
         }
    }
    async login(loginData: LoginDataDto){
        try {
            const {email, password} = loginData;
            
            const isUserExists = await this.userService.findOne({email: email});
            if(!isUserExists){
                return {
                    statusCode: 401,
                    success: false,
                    message: "Invalid credentials."
                }
            } 
            const matchPassword = await bcrypt.compare(password, isUserExists.password);
            if(!matchPassword){
                return {
                    statusCode: 401,
                    success: false,
                    message: "Invalid credentials."
                }
            }
            //generate jwt token
            const userData = isUserExists.toObject();
            delete userData.password;
            const authToken = jwt.sign({userId: isUserExists?._id, email: email}, '1234',{expiresIn: '1h'});
            
            return {
                message: "Login successfull.",
                data: {...userData, auth: authToken},
                statusCode: 200,
                success: true,
            }
        } catch (error) {
            
            return {
                statusCode: 500,
                success: false,
                message: error.toString(),
            }
        }
    }
}
