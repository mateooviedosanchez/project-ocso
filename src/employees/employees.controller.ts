import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/auth/decorator.ts/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { Roles } from 'src/auth/decorator.ts/roles.decorator';
import { Employee } from './entities/employee.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuth } from 'src/auth/decorator.ts/api.decorator';

@ApiAuth()
@ApiTags('Employess')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
      employeeId: "UUIS",
      employeeName: "Karlo",
      employeeEmail: "karlo@gmail.com",
      employeeLastName: "Paz",
      employeePhoneNumber: "44234423",
    } as Employee
  })
  @ApiResponse({
    status: 401,
    description: "Missing or invalid token"
  })
  @ApiResponse({
    status: 403,
    description: "Missing role"
  })
  @ApiResponse({
    status: 500,
    description: "Server error"
  })

  @Auth(ROLES.MANAGER)
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.MANAGER, ROLES.EMPLOYEE)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    dest: "./src/employees/employees-photos"
  }))

  uploadPhoto(@UploadedFile() file: Express.Multer.File){
    console.log(file);
    return "OK";
  };

  @Auth(ROLES.MANAGER)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.MANAGER)
  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({version: '4'})) 
    id: string) 
    {
    return this.employeesService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @Get('/location/:id')
  findAllLocation(@Param('id') id: string) {
    return this.employeesService.findByLocation(+id);
  }

  @Auth(ROLES.EMPLOYEE)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(
    @Param('id', new ParseUUIDPipe({version: '4'})) 
    id: string) 
    {
    return this.employeesService.remove(id);
  }
}
