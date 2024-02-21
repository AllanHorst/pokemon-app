import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokemonDetailPageComponent } from './pokemon-detail-page/pokemon-detail-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokemon/:name', component: PokemonDetailPageComponent },
];
