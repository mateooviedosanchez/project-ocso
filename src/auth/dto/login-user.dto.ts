import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto{
    @ApiProperty({
        default: "user@gmail.com"
    })
    @IsString()
    @IsEmail()
    userEmail: string;

    @ApiProperty({
        default: "342342j"
    })
    @IsString()
    @MinLength(8)
    userPassword: string;
}