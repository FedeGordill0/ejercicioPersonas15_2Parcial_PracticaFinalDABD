import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-persona-baja',
  templateUrl: './persona-baja.component.html',
  styleUrls: ['./persona-baja.component.css'],
})
export class PersonaBajaComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  @Input() persona: Persona;
  @Output() onEliminar = new EventEmitter();

  constructor(private personaService: PersonaService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  eliminarPersona() {
    this.suscripcion.add(
      this.personaService.deletePersona(this.persona).subscribe({
        next: () => {
          this.onEliminar.emit();
        },
        error: () => {
          alert('ERROR personaService.deletePersona');
        },
      })
    );
  }
}
