import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LayoutComponent } from './Components/layout/layout.component';
import { RouterModule, Routes } from '@angular/router';
 
const routes: Routes = [
  { path: '', component: LayoutComponent,
    children: [
      { path: '',  
        loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
      },
    ]
   }
];

@NgModule({
  declarations: [
    NavbarComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule { }
