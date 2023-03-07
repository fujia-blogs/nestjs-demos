import {
  Controller,
  Get,
  Param,
  CacheInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @UseInterceptors(CacheInterceptor)
  @Get('/:id')
  async getPokemon(@Param('id') id: number): Promise<string> {
    return this.pokemonService.getPokemon(+id);
  }
}
