import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { PokemonDetailComponent } from '../components/pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-pokemon-detail-page',
  standalone: true,
  imports: [PokemonDetailComponent, CommonModule, RouterOutlet],
  templateUrl: './pokemon-detail-page.component.html',
})
export class PokemonDetailPageComponent {
  pokemonName: string | null;

  constructor(private route: ActivatedRoute) {
    this.pokemonName = '';
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.pokemonName = params.get('name');
    });
  }
}
