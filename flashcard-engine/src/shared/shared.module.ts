import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

const expiry_seconds = 3600 * 24 * 30;

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: expiry_seconds +'s' },
    }),
  ],
  exports: [JwtModule],
})
export class SharedModule {}