import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appFavorite]'
})
export class FavoriteDirective implements OnInit {
  @Input() appFavorite = 'gray';
  @Input() defaultSize = '1em';
  @Input('type') set setType(value: any) {
    this.type = value;
  }
  @HostBinding('class.isFavorite') isFavorite = true;
  @HostBinding('type') type = 'password';
  @HostListener('mouseenter') onMouseEnter() {
    this.elementRef.nativeElement.style.fontSize = '7em';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.elementRef.nativeElement.style.fontSize = this.defaultSize;
  }

  constructor(private readonly elementRef: ElementRef) {

  }

  ngOnInit() {
    this.elementRef.nativeElement.style.fontSize = this.defaultSize;
    this.elementRef.nativeElement.style.fontFamily = 'Roboto, sans-serif';
    this.elementRef.nativeElement.style.color = this.appFavorite;
  }

}
