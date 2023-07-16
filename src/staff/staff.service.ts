import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './staff.entity';
import { Repository } from 'typeorm';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';


@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>
    ) {

    }
    async create(createStaffDto: CreateStaffDto): Promise<Staff> {
        const staff = new Staff();
        staff.firstName = createStaffDto.firstName;
        staff.lastName = createStaffDto.lastName;
        staff.age = createStaffDto.age;
        staff.accountNumber = createStaffDto.accountNumber;
        return this.staffRepository.save(staff);
    }

    async findAll(): Promise<Staff[]> {
        return this.staffRepository.find();
    }

    async findOne(id: number): Promise<Staff> {
        const staff = await this.staffRepository.findOneBy({ id });
        if (!staff) {
            throw new NotFoundException(`Staff with id ${id} not found`);
        }
        return staff;
    }

    async update(id: number, updateStaffDto: UpdateStaffDto): Promise<Staff> {
        const staff = await this.findOne(id);
        staff.firstName = updateStaffDto.firstName || staff.firstName;
        staff.lastName = updateStaffDto.lastname || staff.lastName;
        staff.age = updateStaffDto.age || staff.age;
        staff.accountNumber = updateStaffDto.accountNumber || staff.accountNumber;
        return this.staffRepository.save(staff);
    }

    async remove(id: number): Promise<void> {
        const staff = await this.findOne(id);
        await this.staffRepository.remove(staff);
    }
}
