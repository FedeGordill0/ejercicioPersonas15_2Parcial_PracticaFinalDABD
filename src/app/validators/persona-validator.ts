import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { PersonaService } from '../services/persona.service';

export class PersonaValidator {
  static documentoExiste(personaService: PersonaService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return personaService.documentoExiste(control.value).pipe(
        map((resultado: boolean) => {
          return resultado ? { documentoExiste: resultado } : null;
        })
      );
    };
  }
}
