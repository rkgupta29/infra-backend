import { Body, Controller, Get, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganisationService } from './organisation.service';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Organisation')
@Controller('organisation')
export class OrganisationController {
  constructor(private readonly service: OrganisationService) {}

  @Get('details')
  @ApiOperation({ summary: 'Get organisation details (public)' })
  @ApiResponse({ status: HttpStatus.OK })
  async getDetails() {
    return this.service.getPublic();
  }

  @Patch('details')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPERADMIN, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update organisation details (admin/superadmin)' })
  async update(@Body() dto: UpdateOrganisationDto) {
    return this.service.updateAll(dto);
  }
}


