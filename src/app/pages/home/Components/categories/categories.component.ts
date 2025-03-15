import { Component, Input, OnChanges, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnChanges, OnDestroy, OnInit {
  @Input() categories: any;
  activeCategory: any;
  films: any[] = [];
  duplicatedFilms: any[] = [];
  
  // Slider properties
  offset = 0;
  activeIndex = 0;
  visibleIndex = 0; // Index of the visible/active item
  imageWidth = 280; // Width of each image including gap (250px + 30px gap)
  sliderInterval: any;
  
  // Center position calculation
  centerPosition = 0;
  containerWidth = 0;
  
  // For managing transitions
  isResetting = false;
  
  ngOnInit() {
    setTimeout(() => {
      this.initializeSlider();
      this.startSlider();
    }, 100);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categories'] && changes['categories'].currentValue) {
      this.categories = changes['categories'].currentValue;
      if (this.categories && this.categories.length > 0) {
        this.activeCategory = this.categories[0];
        this.films = this.activeCategory.Films || [];
        
        setTimeout(() => {
          this.initializeSlider();
        }, 200);
      }
    }
  }
  
  initializeSlider(): void {
    if (!this.films || this.films.length === 0) return;
    
    // Create a duplicated array (3 copies of the original)
    this.duplicatedFilms = [...this.films, ...this.films, ...this.films];
    
    // Calculate container width
    this.containerWidth = document.querySelector('.slider-container')?.clientWidth || 800;
    
    // Calculate center position
    this.centerPosition = this.containerWidth / 2;
    
    // Set initial offset to show middle film centered
    this.repositionToCenter();
    
    // Set initial active index
    this.activeIndex = this.films.length; // Start with the middle set of films
    this.visibleIndex = 0; // The first film is initially active
  }
  
  repositionToCenter(): void {
    // Position the middle of the first element of the middle set at the center
    this.offset = this.centerPosition - (this.imageWidth / 2) - (this.films.length * this.imageWidth);
  }
  
  setActiveCategory(category: any): void {
    this.activeCategory = category;
    this.films = category.Films || [];
    
    setTimeout(() => {
      this.initializeSlider();
    }, 100);
  }
  
  startSlider(): void {
    this.sliderInterval = setInterval(() => {
      this.slideNext();
    }, 3000); // Change slide every 3 seconds
  }
  
  slideNext(): void {
    if (this.isResetting || this.films.length === 0) return;
    
    // Move one image to the left
    this.offset -= this.imageWidth;
    
    // Update active index
    this.activeIndex = (this.activeIndex + 1) % this.duplicatedFilms.length;
    
    // Update the visible index (which film is shown as active)
    this.visibleIndex = (this.visibleIndex + 1) % this.films.length;
    
    // Check if we need to reset position
    // If we've gone through one complete set of films
    if (this.activeIndex % this.films.length === 0 && this.activeIndex > 0) {
      this.resetPositionSeamlessly();
    }
  }
  
  resetPositionSeamlessly(): void {
    this.isResetting = true;
    
    // Wait for the transition to complete
    setTimeout(() => {
      const gallery = document.querySelector('.image-gallery') as HTMLElement;
      if (gallery) {
        // Disable transition temporarily
        gallery.style.transition = 'none';
        
        // Move back by one set of films (to maintain visual position)
        this.offset += (this.films.length * this.imageWidth);
        this.activeIndex -= this.films.length;
        
        // Force browser reflow
        void gallery.offsetHeight;
        
        // Re-enable transition
        gallery.style.transition = 'transform 0.5s ease-in-out';
      }
      
      this.isResetting = false;
    }, 500); // Wait for transition to complete
  }
  
  isActive(index: number): boolean {
    // An item is active if it's the current active index
    return index === this.activeIndex;
  }
  
  ngOnDestroy(): void {
    clearInterval(this.sliderInterval);
  }
}