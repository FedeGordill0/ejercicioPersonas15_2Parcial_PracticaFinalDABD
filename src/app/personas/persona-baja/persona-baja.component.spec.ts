import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaBajaComponent } from './persona-baja.component';

describe('PersonaBajaComponent', () => {
  let component: PersonaBajaComponent;
  let fixture: ComponentFixture<PersonaBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaBajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
