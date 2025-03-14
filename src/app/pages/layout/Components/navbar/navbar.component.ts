import { Component } from '@angular/core';
import { NavbarElement } from 'src/app/pages/shared/Interfaces/NavbarElement';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  navbarElements: NavbarElement[] = [
    { label: 'All Movies', path: '/' },
    { label: 'For Kids', path: '/about' },
    
    { label: 'Select Branch', path: '/contact' }
  ];  
}



