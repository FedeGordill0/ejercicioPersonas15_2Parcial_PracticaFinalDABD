import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaListadoComponent } from './persona-listado.component';

describe('PersonaListadoComponent', () => {
  let component: PersonaListadoComponent;
  let fixture: ComponentFixture<PersonaListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
