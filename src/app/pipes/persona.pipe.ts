import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mayoriaEdad',
})
export class PersonaPipe implements PipeTransform {
  private readonly edad_defecto = 18;
  transform(valor: number, ...args: any[]): unknown {
    args[0] = args[0] ? args[0] : this.edad_defecto;
    const resultado = valor > args[0] ? 'SI' : 'NO';
    return resultado;
  }
}
