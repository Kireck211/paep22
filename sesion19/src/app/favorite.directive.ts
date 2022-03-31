import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appFavorite]'
})
export class FavoriteDirective implements OnInit {
  @Input() appFavorite = 'gray';
  @Input() defaultSize = '1em';
  @HostBinding('class.isFavorite') isFavorite = true;

  constructor(private readonly elementRef: ElementRef) {

  }

  ngOnInit() {
    this.elementRef.nativeElement.style.fontSize = this.defaultSize;
    this.elementRef.nativeElement.style.fontFamily = 'Roboto, sans-serif';
    this.elementRef.nativeElement.style.color = this.appFavorite;
  }

}
