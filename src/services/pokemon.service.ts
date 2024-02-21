import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  PokemonByTypeResponse,
  PokemonDetail,
  PokemonDetailResponse,
  PokemonListItem,
  PokemonListResponse,
} from '../types/pokemonResponse';

const LIMIT = 1500;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  getPokemons(
    name: string = '',
    page: number = 1
  ): Observable<PokemonListItem[]> {
    const offset = LIMIT * (page - 1);
    return this.http
      .get<PokemonListResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`
      )
      .pipe(
        map((data) => {
          return data.results.filter(({ name: pokemonName }) =>
            pokemonName.toLowerCase().includes(name.toLocaleLowerCase())
          );
        })
      );
  }

  getByType(
    type: string = 'normal',
    name: string = '',
    page: number = 1
  ): Observable<PokemonListItem[]> {
    const offset = LIMIT * (page - 1);
    return this.http
      .get<PokemonByTypeResponse>(
        `https://pokeapi.co/api/v2/type/${type}?limit=${LIMIT}&offset=${offset}`
      )
      .pipe(
        map((data) => {
          return data.pokemon
            .map(({ pokemon }) => pokemon)
            .filter(({ name: pokemonName }) =>
              pokemonName.toLowerCase().includes(name.toLocaleLowerCase())
            );
        })
      );
  }

  getPokemonByNameOrId(param: string): Observable<PokemonDetail> {
    return this.http
      .get<PokemonDetailResponse>(`https://pokeapi.co/api/v2/pokemon/${param}`)
      .pipe(
        map((data) => {
          return {
            id: data.id,
            name: data.name,
            types: data.types?.map(({ type }) => type.name),
            imageUrl: data.sprites?.other.home.front_default,
          };
        })
      );
  }
}
