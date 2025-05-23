import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Location } from 'src/locations/entities/location.entity';


@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>
  ){}

  create(createManagerDto: CreateManagerDto) {
    const manager = this.managerRepository.create(createManagerDto as DeepPartial<Manager>);
    return this.managerRepository.save(manager);
  }

  findAll() {
    return this.managerRepository.find({relations: {
      location: true,
    }})
  }

  findOne(id: string) {
    const manager = this.managerRepository.findOne({
      where: {managerId: id},
      relations: {
        location: true,
        user: true,
      }
    });
    if (!manager) throw new NotFoundException("No manager found")
      return manager;
  }

  async  update(id: string, updateManagerDto: UpdateManagerDto) {
    const managerToUpdate = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto,
      // location: updateManagerDto.location as DeepPartial<Location> | undefined,
    });
    if (!managerToUpdate) throw new BadRequestException();
    return this.managerRepository.save(managerToUpdate)
  }

  remove(id: string) {
    return this.managerRepository.delete({
      managerId: id,
    });
  }
}
