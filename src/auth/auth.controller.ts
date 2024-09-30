import {
  Controller,
  Request,
  UseGuards,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { apiResponseWrapper } from '../utils/factories/apiResponseWrapper.factory';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { LoginRequestDto } from './dto/loginRequest.dto';
import { apiErrorWrapper } from '../utils/factories/apiErrorWrapper.factory';
import { ErrorResponseDto } from '../utils/dto/error.dto';
import { LogoutResponseDto } from './dto/logoutResponse.dto';
import { UserInterface } from '../utils/interface/user.interface';
import { Auth } from './auth.decorador';
import { GetUser } from '../utils/decorators/user.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Login users',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: apiResponseWrapper(LoginResponseDto),
    description: 'Created',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    type: apiErrorWrapper(ErrorResponseDto),
    description: 'Unauthorized',
  })
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginRequestDto })
  @Post('signin')
  async login(@Request() req: any): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: 'Logout',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: apiResponseWrapper(LogoutResponseDto),
    description: 'User had been logout',
  })
  @Auth()
  @Post('logout')
  async logout(@GetUser() user: UserInterface): Promise<void> {
    return this.authService.logout(user);
  }
}
