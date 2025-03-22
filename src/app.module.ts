import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { Product } from './products/entities/product.entity';
import { ProvidersModule } from './providers/providers.module';
import { ManagersModule } from './managers/managers.module';
import { LocationsModule } from './locations/locations.module';
import { RegionsModule } from './regions/regions.module';
import { AuthModule } from './auth/auth.module';
import { EXPIRES_IN, JWT_KEY } from './auth/constants/jwt.constants';

@Module({
  imports: [
  ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.host,
    port: Number(process.env.DB_port),
    username: "postgres",
    password: process.env.pass,
    database: process.env.name,
    entities: [Product],
    autoLoadEntities: true,
    synchronize: true,
  }), 
  EmployeesModule, 
  ProductsModule, ProvidersModule, ManagersModule, LocationsModule, RegionsModule, AuthModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
