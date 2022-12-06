import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pais } from 'src/app/models/pais';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-persona-listado',
  templateUrl: './persona-listado.component.html',
  styleUrls: ['./persona-listado.component.css'],
})
export class PersonaListadoComponent implements OnInit, OnDestroy {
  private suscripcion = new Subscription();
  listadoPersonas: Persona[] = [];

  constructor(private personaService: PersonaService, private router: Router) {}

  ngOnInit(): void {
    this.actualizarListado();
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  actualizarListado() {
    this.suscripcion.add(
      this.personaService.getComboPaises().subscribe({
        next: (listado: Pais[]) => {
          this.personaService.getListadoPersonas().subscribe({
            next: (resultado: Persona[]) => {
              resultado.forEach((persona: Persona) => {
                const listadoIndex = listado.findIndex(
                  (x) => x.id === persona.paisId
                );
                persona.pais = listado[listadoIndex];
              });
              this.listadoPersonas = resultado;
            },
            error: () => {
              alert('ERROR personaService.getListadoPersonas');
            },
          });
        },
        error: () => {
          alert('ERROR personaService.getComboPaises');
        },
      })
    );
  }

  inicio() {
    this.router.navigate(['']);
  }

  nuevaPersona() {
    this.router.navigate(['alta']);
  }
}
