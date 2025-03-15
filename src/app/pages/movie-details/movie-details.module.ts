import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './Components/movie-details/movie-details.component';

const routes: Routes = [
  { path: ':categoryId/movie/:movieId', component: MovieDetailsComponent }
];
@NgModule({
  declarations: [
    MovieDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MovieDetailsModule { }
