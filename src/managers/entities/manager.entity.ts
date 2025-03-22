import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Location } from '../../locations/entities/location.entity';

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managerId: string;
    @Column()
    managerFullName: string;
    @Column('float')
    managerSalary: number;
    @Column()
    managerEmail: string;
    @Column()
    managerPhone: string;

    @OneToOne(() => Location)
    @JoinColumn({
        name: 'locationId'
    })
    location: Location;
}