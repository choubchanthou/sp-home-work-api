import { IsString, IsNumber, MinLength } from 'class-validator';

export class CreateStaffDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsNumber()
    age: number;

    @MinLength(6)
    accountNumber: string
}