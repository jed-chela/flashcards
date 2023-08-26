import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private httpService: HttpService) {}
  
  private auth_url = "http://localhost:3000/api/auth/authguard/";
  
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    // Send HTTP request to admin microservice using Axios (instead of using RabbitMQ)
    console.log("AuthGuard is checking Auth Module in Engine Service");
    try {
      const response = await this.sendRequest(token);
      if (response) {
        console.log(response);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error:', error.message);
      return false;
    }
  }

  async sendRequest(token: string): Promise<AxiosResponse> {
    try {
      const response: AxiosResponse = await this.httpService.post(this.auth_url, {"token":token}).toPromise();
      return response.data;
    } catch (error) {
      return null;
    }
  }
}