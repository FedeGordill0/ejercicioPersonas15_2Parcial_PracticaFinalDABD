import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaModificarComponent } from './persona-modificar.component';

describe('PersonaModificarComponent', () => {
  let component: PersonaModificarComponent;
  let fixture: ComponentFixture<PersonaModificarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaModificarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
