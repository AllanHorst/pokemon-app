import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonListItem } from '../../types/pokemonResponse';
import { pokemonTypes } from '../../utils/pokemonTypes';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailComponent } from '../components/pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PokemonDetailComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  pokemons: PokemonListItem[] = [];
  filterForm: FormGroup;
  types = pokemonTypes;
  randomPokemon = '';

  constructor(
    private pokemonService: PokemonService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.filterForm = this.formBuilder.group({
      name: [''],
      type: [''],
    });
  }

  ngOnInit(): void {
    this.getPokemons();
  }

  async onFilter(): Promise<void> {
    const { name, type } = this.filterForm.value;
    if (type) {
      await this.getPokemonsByType(type, name);
    } else {
      await this.getPokemons(name);
    }
  }

  async getPokemons(name?: string): Promise<void> {
    this.pokemonService.getPokemons(name).subscribe((data) => {
      this.pokemons = data;
      this.getRandomPokemon();
    });
  }
  async getPokemonsByType(type: string, name?: string): Promise<void> {
    this.pokemonService.getByType(type, name).subscribe((data) => {
      this.pokemons = data;
    });
  }

  onPokemonClick(name: string): void {
    console.log('name', name);
    this.router.navigate(['/pokemon', name]);
  }

  getRandomPokemon() {
    console.log(this);
    const randomIndex = Math.floor(Math.random() * this.pokemons.length);
    this.randomPokemon = this.pokemons[randomIndex].name;
  }
}
