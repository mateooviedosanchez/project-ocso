import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";


export class CreateProviderDto {
    @IsString()
    @MaxLength(150)
    providerName: string;
    @IsEmail()
    @IsString()
    providerEmail: string;
    @IsString()
    @MaxLength(15)
    @IsOptional()
    providerPhoneNumber: string;
}
