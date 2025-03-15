import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CinemasComponent } from './Components/cinemas/cinemas.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CinemasComponent }
];

@NgModule({
  declarations: [
    CinemasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    CinemasComponent
  ]
})
export class CinemasModule { }
