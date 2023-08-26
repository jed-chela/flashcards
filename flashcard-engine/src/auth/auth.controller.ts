import { Controller, Post, Body, Request, ValidationPipe, Get, UseGuards, Inject, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { SharedModule } from '../shared/shared.module';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private jwtService: JwtService, 
    ) {}

  @Post('register')
  async register(@Body(ValidationPipe) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
    @Body('email') email:string,
    @Body('password') password:string,
  ){
    let user = await this.authService.validateUser(email, password);
    if (user === false) {
      return {
        "status": false,
        "statusCode": 400,
        "error": "login failed"
      };
    } else {
      const token = await this.generateToken(user);
      console.log(token);
      return {
        "status": true,
        "statusCode": 200,
        "token": token
      };;
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req): any {
    return "User Profile";
  }

  @Post('authguard')
  handleRequest(@Body() data: any) {
    // Process the request data here
    // Return a response if needed
    try {
      const decodedToken = this.jwtService.verify(data.token);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }


  async generateToken(user: any): Promise<any> {
    // Generate a JWT token using the user ID and email
    const payload = { id: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}
