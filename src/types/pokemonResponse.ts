export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonListItem[];
}

export interface PokemonByTypeResponse {
  pokemon: { pokemon: PokemonListItem }[];
}

export interface PokemonDetailResponse {
  id: number;
  name: string;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  types: string[];
  imageUrl: string;
}
