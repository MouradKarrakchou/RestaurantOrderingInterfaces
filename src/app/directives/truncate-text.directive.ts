import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[truncateText]'
})
export class TruncateTextDirective implements AfterViewInit {
  @Input('truncateText') maxLength: number = 50; // Définissez la longueur maximale ici

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const element = this.el.nativeElement;
    if (element.innerText.length > this.maxLength) {
      element.innerText = element.innerText.substring(0, this.maxLength) + '...';
    }
  }
}
