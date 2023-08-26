import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.model';
import { RegisterDto } from '../dto/register.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
   constructor(@InjectModel('User') private userModel: Model<User>) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { firstname, lastname, email, password } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ firstname, lastname, email, password: hashedPassword });

    return user.save();
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (user){
      
      try {
        const passwordMatch = await this.comparePasswords(password, user.password);
        if (passwordMatch) {
          // Passwords match, proceed with login logic

          // Return the token or any other relevant information to the client
          return {
            success: true,
            message: 'Login successful',
            user: user,
          };
        } else {
          // Passwords do not match, handle the error
          // ...
          return false;
        }
      } catch (error) {
        // Handle any errors that occurred during the comparison
        // ...
        return false;
      }
    }
    return false;
  }

  async comparePasswords(plainPassword: string, hashedPassword: string): Promise<boolean> {
    try {
      const match = await bcrypt.compare(plainPassword, hashedPassword);
      return match;
    } catch (error) {
      // Handle the error appropriately
      throw new Error('Error comparing passwords');
    }
  }

  
}
