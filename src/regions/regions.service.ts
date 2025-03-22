import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionsService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>
  ){}

  create(createRegionDto: CreateRegionDto) {
    return this.regionRepository.save(createRegionDto);
  }

  findAll() {
    return this.regionRepository.find();
  }

  findOne(id: number) {
    const region = this.regionRepository.findOneBy({
      regionId: id
    });
    if (!region) throw new NotFoundException("Region no encontrada")
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const location = await this.regionRepository.preload({
      regionId: id,
      ... UpdateRegionDto,
    });
    if (!location) throw new BadRequestException();
    return this.regionRepository.save(location);
  }

  remove(id: number) {
    return this.regionRepository.delete({
      regionId: id,
    });
  }
}
