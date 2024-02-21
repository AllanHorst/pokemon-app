import { CommonModule } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonService } from '../../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss',
})
export class PokemonDetailComponent {
  @Input()
  pokemonName!: string;

  @Input()
  showNavigationButtons!: boolean;

  @Input()
  onRefreshClick!: () => void;

  pokemon: any;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.getPokemonDetails(this.pokemonName);
  }

  getPokemonDetails(name: string): void {
    this.pokemonService.getPokemonByNameOrId(name).subscribe((data) => {
      this.pokemon = data;
    });
  }
}
