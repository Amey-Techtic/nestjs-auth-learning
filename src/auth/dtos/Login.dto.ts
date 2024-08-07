import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class LoginDataDto{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/, {message: 'Password must contain atleast one number'})
    password: string;
}