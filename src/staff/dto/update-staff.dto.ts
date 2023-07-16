import { PartialType } from '@nestjs/mapped-types';
import { CreateStaffDto } from './create-staff.dto';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {
    firstName: string;

    lastname: string;

    age: number;

    accountNumber: string;

}
