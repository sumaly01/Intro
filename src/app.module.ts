import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './admin/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    UsersModule,
    AdminModule,
    AuthModule,
    //NOT WORKING
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'dev'}`,
      isGlobal: true,
      expandVariables: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/Intro'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
