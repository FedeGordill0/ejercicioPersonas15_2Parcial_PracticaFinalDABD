import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaAltaComponent } from './personas/persona-alta/persona-alta.component';
import { PersonaListadoComponent } from './personas/persona-listado/persona-listado.component';
import { PersonaModificarComponent } from './personas/persona-modificar/persona-modificar.component';

const routes: Routes = [
  { path: 'listado', component: PersonaListadoComponent },
  { path: 'alta', component: PersonaAltaComponent },
  { path: 'modificar/:id', component: PersonaModificarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
