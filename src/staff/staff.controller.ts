import { Controller, Get, Post, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { Staff } from './staff.entity';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Controller('staff')
export class StaffController {
    constructor(private staffService: StaffService) { }

    @Post()
    create(@Body() createStaffDto: CreateStaffDto): Promise<Staff> {
        return this.staffService.create(createStaffDto);
    }

    @Get()
    findAll(): Promise<Staff[]> {
        return this.staffService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Staff> {
        return this.staffService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() updateStaffDto: UpdateStaffDto): Promise<Staff> {
        return this.staffService.update(id, updateStaffDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<void> {
        return this.staffService.remove(id);
    }

}
