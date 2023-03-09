import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';

@Injectable()
export class PokemonService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async getPokemon(id: number): Promise<string> {
    // check if data is in cache
    const cacheData = await this.cacheService.get<{
      name: string;
    }>(id.toString());

    if (cacheData) {
      console.log('Data from cache!');
      return `${cacheData.name}`;
    }

    // if not, call api and set the cache
    const { data } = await this.httpService.axiosRef.get(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );

    await this.cacheService.set(id.toString(), data);

    return await `${data.name}`;
  }
}
