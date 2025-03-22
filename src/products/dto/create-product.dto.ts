import { IsInt, IsNumber, IsObject, IsOptional, IsString, isString, IsUUID, MaxLength } from "class-validator";
import { Product } from "../entities/product.entity";
import { Provider } from "@nestjs/common";

export class CreateProductDto {
    @IsString()
    @IsUUID("4")
    @IsOptional()
    productId: string;
    @IsString()
    @MaxLength(40)
    productName: string;
    @IsNumber()
    price: number;
    @IsInt()
    countSeal: number;
    @IsObject()
    provider: Provider;
}
