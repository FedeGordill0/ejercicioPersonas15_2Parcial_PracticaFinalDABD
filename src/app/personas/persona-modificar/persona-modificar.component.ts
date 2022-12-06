import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ciudad } from 'src/app/models/ciudad';
import { Pais } from 'src/app/models/pais';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/persona.service';
import { PersonaValidator } from 'src/app/validators/persona-validator';

@Component({
  selector: 'app-persona-modificar',
  templateUrl: './persona-modificar.component.html',
  styleUrls: ['./persona-modificar.component.css'],
})
export class PersonaModificarComponent implements OnInit {
  private suscripcion = new Subscription();
  formulario: FormGroup;
  listadoPaises: Pais[] = [];
  listadoCiudades: Ciudad[] = [];
  persona: Persona;
  calculo: number = 0;
  @ViewChild('inputPorcentaje') inputPorcentaje: ElementRef;

  constructor(
    private personaService: PersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      documento: [
        '',
        Validators.required,
        PersonaValidator.documentoExiste(this.personaService),
      ],
      sueldo: ['', Validators.required],
      porcentaje: [''],
      paisId: ['', Validators.required],
      ciudadId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarForm();
    this.suscripcion.add(
      this.personaService.getComboPaises().subscribe({
        next: (listado: Pais[]) => {
          this.listadoPaises = listado;

          this.formulario.get('paisId')?.valueChanges.subscribe({
            next: (valor) => {
              let idCiudad = valor;

              this.personaService.getComboCiudadID(idCiudad).subscribe({
                next: (listado: Ciudad[]) => {
                  this.listadoCiudades = listado;
                },
                error: () => {
                  alert('ERROR personaService.getComboCiudadID');
                },
              });
            },
            error: () => {
              alert('ERROR formulario.get');
            },
          });
        },
        error: () => {
          alert('ERROR personaService.getComboPaises');
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  guardar() {
    if (this.formulario.valid) {
      this.persona = this.formulario.value;

      this.persona.sueldo = Number(this.persona.sueldo);
      this.persona.porcentaje = Number(this.persona.porcentaje);
      this.persona.sueldo_total = Number(this.persona.sueldo_total);

      this.calculo =
        this.persona.sueldo +
        (this.persona.sueldo * this.persona.porcentaje) / 100;

      this.persona.sueldo_total = this.calculo;

      this.suscripcion.add(
        this.personaService.putPersona(this.persona).subscribe({
          next: () => {
            this.router.navigate(['listado']);
          },
          error: () => {
            alert('ERROR personaService.putPersona');
          },
        })
      );
    } else {
      alert('ERROR CARGA DE FORMULARIO');
    }
  }

  cancelar() {
    this.router.navigate(['listado']);
  }

  checkPorcentaje(e: any) {
    if (e.target.checked) {
      this.inputPorcentaje.nativeElement.style.display = '';
    } else {
      this.inputPorcentaje.nativeElement.style.display = 'none';
    }
  }

  mostrarForm() {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        const id = params['id'];

        if (id) {
          this.personaService.getPersonaID(id).subscribe({
            next: (p: Persona) => {
              this.persona = p;

              this.formulario = this.fb.group({
                id: [p.id, Validators.required],
                nombre: [p.nombre, Validators.required],
                apellido: [p.apellido, Validators.required],
                edad: [p.edad, Validators.required],
                documento: [
                  p.documento,
                  Validators.required,
                  PersonaValidator.documentoExiste(this.personaService),
                ],
                sueldo: [p.sueldo, Validators.required],
                porcentaje: [p.porcentaje],
                paisId: [p.paisId, Validators.required],
                ciudadId: [p.ciudadId, Validators.required],
              });
            },
            error: () => {
              alert('ERROR personaService.getPersonaID');
            },
          });
        }
      },
      error: () => {
        alert('ERROR activatedRoute.params');
      },
    });
  }
}
