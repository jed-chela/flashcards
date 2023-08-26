import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { SharedModule } from '../shared/shared.module';
  
  @Injectable()
    export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromRequest(request);
        console.log(token);

        // Add your custom logic for token validation here
        if (!token) {
        throw new UnauthorizedException('Invalid token');
        }
        
        try {
        const decodedToken = this.jwtService.verify(token);
        request.user = decodedToken; // Store the decoded token in the request object
        return true;
        } catch (error) {
        throw new UnauthorizedException('Invalid token');
        }
    }

    private extractTokenFromRequest(request: any): string | null {
        // Extract the token from the request headers, query parameters, or cookies
        const authHeader = request.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
        }
        return null;
    }

    public validateToken(token: string){
        console.log(token);
        if (!token) {
        throw new UnauthorizedException('Invalid token');
        }
        
        try {
        const decodedToken = this.jwtService.verify(token);
        return true;
        } catch (error) {
        throw new UnauthorizedException('Invalid token');
        }
    }
}