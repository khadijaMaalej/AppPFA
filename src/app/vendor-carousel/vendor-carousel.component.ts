import { AfterViewInit, Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-vendor-carousel',
  templateUrl: './vendor-carousel.component.html',
  styleUrls: ['./vendor-carousel.component.css']
})
export class VendorCarouselComponent implements AfterViewInit {

  ngAfterViewInit() {
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 5
        }
      }
    });
  }
}
