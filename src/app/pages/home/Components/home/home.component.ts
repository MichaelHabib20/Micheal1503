import { Component, OnInit } from '@angular/core';
import { DataContextService } from 'src/app/pages/shared/Services/data-context.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: any;
  constructor(private dataContextService: DataContextService) { }

  ngOnInit() {
    this.dataContextService.movies$.subscribe(value => {
      this.movies = JSON.parse(value);
    });
  }
}