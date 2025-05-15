import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "./dto/login-user.dto";
import { Manager } from "src/managers/entities/manager.entity";
import { Employee } from "src/employees/entities/employee.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    @InjectRepository(Manager) private managerRepository: Repository<Manager>,
    private jwtService: JwtService
  ) {}

  async registerEmployee(id: string, createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    const user = await this.userRepository.save(createUserDto);
    const employee = await this.employeeRepository.preload({
      employeeId: id,
    });
    if (!employee) {
      throw new UnauthorizedException("Empleado no encontrado");
    }
    employee.user = user;
    await this.employeeRepository.save(employee);
  }

   async registerManager(id: string, createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    const user = await this.userRepository.save(createUserDto);
    const manager = await this.managerRepository.preload({
      managerId: id,
    });
    if (!manager) {
      throw new UnauthorizedException("Manager no encontrado");
    }
    manager.user = user;
    await this.employeeRepository.save(manager);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        userEmail: loginUserDto.userEmail,
      },
    });

    if (!user) throw new UnauthorizedException("No estas autorizado");

    const match = await bcrypt.compare(
      loginUserDto.userPassword,
      user.userPassword
    );

    if (!match) throw new UnauthorizedException("No estas autorizado");

    const payload = {
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userRoles: user.userRoles,
    };

    const token = this.jwtService.sign(payload);
    return token;
  }

  async updateUser(userEmail: string, updateUserDto: UpdateUserDto) {
    const newUserData = await this.userRepository.preload({
      userEmail,
      ...updateUserDto,
    });

    if (!newUserData) {
      throw new UnauthorizedException("User no encontrado");
    }

    await this.userRepository.save(newUserData);
    return newUserData;
  }
}
