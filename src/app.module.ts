import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // CacheModule.register({
    //   isGlobal: true,
    //   store: redisStore,
    //   host: 'redis-16609.c295.ap-southeast-1-1.ec2.cloud.redislabs.com',
    //   port: '16609',
    //   username: 'default',
    //   password: 'J30m2snmpSROtGqkRKtfRjRh0LEmOAz1',
    //   no_ready_check: true,
    // }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
      no_ready_check: true,
    }),
    PokemonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
