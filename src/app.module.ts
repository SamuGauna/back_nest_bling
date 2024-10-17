import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppImports } from './app.imports';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './bcrypt/bcript.module';
import { EmailsModule } from './emails/emails.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ...AppImports,
    HealthModule,
    EmailsModule,
    BcryptModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
