import { Ciudad } from './ciudad';
import { Pais } from './pais';

export class Persona {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  documento: number;
  sueldo: number;
  porcentaje: number;
  sueldo_total: number;

  paisId: number;
  pais?: Pais;

  ciudadId: number;
  ciudad?: Ciudad;
}
