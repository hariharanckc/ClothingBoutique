import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  images: string[] = [
    'assets/images/user/leftbanner.jpg',
    'assets/images/user/banner1.jpg',
    'assets/images/user/banner3.jpg',
    'assets/images/user/banner2.jpg',
  ];
  activeIndex: number = 0;
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.startCarousel();
  }

  startCarousel() {
    setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    }, 3000); // Change the duration (in milliseconds) as needed




  }
}
