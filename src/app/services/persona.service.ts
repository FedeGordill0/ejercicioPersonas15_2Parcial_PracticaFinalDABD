import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Persona } from '../models/persona';
import { Pais } from '../models/pais';
import { Ciudad } from '../models/ciudad';

@Injectable()
export class PersonaService {
  api_personas: string = 'https://6349730fa59874146b2064d3.mockapi.io/persona/';
  api_paises: string = 'https://6349730fa59874146b2064d3.mockapi.io/pais/';

  constructor(private http: HttpClient) {}

  getListadoPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.api_personas);
  }

  getPersonaID(id: number): Observable<Persona> {
    return this.http.get<Persona>(this.api_personas + id);
  }

  postPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.api_personas, persona);
  }

  deletePersona(persona: Persona): Observable<any> {
    return this.http.delete(this.api_personas + persona.id);
  }

  putPersona(persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(this.api_personas + persona.id, persona);
  }

  getComboPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.api_paises);
  }

  getComboCiudadID(id: number): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(`${this.api_paises}${id}/ciudad`);
  }

  documentoExiste(valor: number): Observable<boolean> {
    return this.http
      .get<Persona[]>(this.api_personas)
      .pipe(map((a) => a.some((z) => z.documento === valor)));
  }
}
