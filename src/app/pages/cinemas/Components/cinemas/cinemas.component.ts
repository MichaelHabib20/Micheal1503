import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { DataContextService } from 'src/app/pages/shared/Services/data-context.service';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
interface Cinema {
  CinemaName: string;
  CinemaImage: string;
  CinemaRating: number;
  TicketsAvailable: number;
  CinemaHalls: number;
}

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: ['./cinemas.component.scss']
})
export class CinemasComponent implements OnInit, OnDestroy {
  cinemas: Cinema[] = [];
  filteredCinemas: Cinema[] = [];
  searchTerm: string = '';
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private dataContextService: DataContextService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.router);
    this.setupSearchDebounce();

    this.dataContextService.movies$.subscribe((value: any) => {
      if (value) {
        this.cinemas = JSON.parse(value).Cinemas;
        this.filteredCinemas = this.cinemas;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupSearchDebounce() {
    this.searchSubject.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  onSearchChange(searchValue: string) {
    this.searchTerm = searchValue;
    this.searchSubject.next(searchValue);
  }

  private performSearch(searchTerm: string) {
    if (!searchTerm.trim()) {
      this.filteredCinemas = this.cinemas;
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    this.filteredCinemas = this.cinemas.filter(cinema => 
      cinema.CinemaName.toLowerCase().includes(searchTermLower)
    );
  }

  goBack() {
    this.location.back();
  }
}
