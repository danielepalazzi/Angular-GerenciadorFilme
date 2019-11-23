import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataFormComponent } from './data-form/data-form.component';
import { FilmeListaComponent } from './filme-lista/filme-lista.component';


const routes: Routes = [
  { path: '', redirectTo: 'filmeLista', pathMatch: 'full' },
  { path: 'filmeLista', component: FilmeListaComponent },
  { path: 'novo', component: DataFormComponent },
  { path: 'editar/:id', component: DataFormComponent },
  { path: 'consulta/:id', component: DataFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
