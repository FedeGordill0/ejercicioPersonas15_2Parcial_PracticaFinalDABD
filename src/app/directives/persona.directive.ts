import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPersona]',
})
export class PersonaDirective {
  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  cambioColorEnter() {
    this.el.nativeElement.style.color = 'red';
    this.el.nativeElement.style.backgroundColor = 'black';
  }

  @HostListener('mouseleave')
  cambioColorLeave() {
    this.el.nativeElement.style.color = 'black';
    this.el.nativeElement.style.backgroundColor = 'white';
  }
}
