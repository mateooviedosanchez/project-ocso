import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Location } from '../../locations/entities/location.entity';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managerId: string;
    @Column('text')
    managerFullName: string;
    @Column('float')
    managerSalary: number;
    @Column('text', {
        unique: true
    })
    managerEmail: string;
    @Column('text')
    managerPhoneNumber: string;

    @OneToOne(() => Location)
    @JoinColumn({
        name: "locationId"
    })
    location: Location;

    @OneToOne(() => User)
    @JoinColumn({
        name: "userId"
    })
    user: User;
}