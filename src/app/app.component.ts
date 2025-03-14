import { Component, OnInit } from '@angular/core';
import { DataContextService } from './pages/shared/Services/data-context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Micheal1503';

  constructor(private dataContextService: DataContextService) { }

  ngOnInit() {
    this.getMovies();
  }
  getMovies() {
    this.dataContextService.GetData('https://mocki.io/v1/72e5ee70-4b07-4939-aa4b-3f5573e80f81').subscribe(data => {
      this.dataContextService.moviesSuject.next(data);
    });
  }
}
