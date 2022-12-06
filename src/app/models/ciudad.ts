import { Pais } from './pais';

export class Ciudad {
  id: number;
  nombre: string;

  paiId: number;
  pais?: Pais;
}
