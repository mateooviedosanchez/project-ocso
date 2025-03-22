import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "src/locations/entities/location.entity";
import { User } from "src/auth/entities/user.entity";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employeeId:string;
    @Column('text')
    employeeName: string;
    @Column('text')
    employeeLastName: string;
    @Column('text')
    employeePhoneNumber: string;
    @Column('text', {
        unique: true
    })
    employeeEmail: string;
    @Column({
        type: 'text',
        nullable: true,
    })
    employeePhoto: string;

    @ManyToMany(() => Location, (location) => location.employees)
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
