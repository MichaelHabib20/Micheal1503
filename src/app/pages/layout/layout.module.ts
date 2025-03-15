import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsModule } from '../movie-details/movie-details.module';
import { CinemasModule } from '../cinemas/cinemas.module';
const routes: Routes = [
  { path: '', component: LayoutComponent,
    children: [
      { path: '',  
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
      },
      { path: 'category',  
        loadChildren: () => import('../movie-details/movie-details.module').then(m => MovieDetailsModule)
      },
      { path: 'cinemas',  
        loadChildren: () => import('../cinemas/cinemas.module').then(m => CinemasModule)
      },
    ]
   }
];

@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule { }
