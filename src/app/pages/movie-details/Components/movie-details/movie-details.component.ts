import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataContextService } from 'src/app/pages/shared/Services/data-context.service';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  categoryId: any;
  movieId: any;
  data: any;
  showFullDescription = false;
  maxLength = 90; // Maximum characters to show initially

  constructor(private route: ActivatedRoute, private dataContextService: DataContextService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.categoryId = Number(params['categoryId']);
      this.movieId = Number(params['movieId']);
    });
    this.dataContextService.movies$.subscribe((value :any)=> {
      if(value){
        this.data = JSON.parse(value);
        this.movie = this.data.Categories.find((category: any) => category.CategoryID === this.categoryId).Films.find((movie: any) => movie.FilmID === this.movieId);
      }
    });
  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }

  get truncatedDescription(): string {
    if (!this.movie?.FilmDescription) return '';
    if (this.showFullDescription) return this.movie.FilmDescription;
    return this.movie.FilmDescription.length > this.maxLength 
      ? `${this.movie.FilmDescription.slice(0, this.maxLength)}...` 
      : this.movie.FilmDescription;
  }

  get shouldShowToggle(): boolean {
    return this.movie?.FilmDescription?.length > this.maxLength;
  }
  navigateToCinemas() {
    if(this.movie.HasTicketsAvail){
      this.router.navigate(['/cinemas']);
    }
  }
}
