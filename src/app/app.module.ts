import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Importando o módulo de formulários reativos do angular
import { ReactiveFormsModule } from '@angular/forms';
//import { DataFormModule } from './data-form/data-form.module';
import { FilmeListaComponent } from './filme-lista/filme-lista.component';
import { DataFormComponent } from './data-form/data-form.component';



@NgModule({
  declarations: [
    AppComponent,
    FilmeListaComponent,
    DataFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }