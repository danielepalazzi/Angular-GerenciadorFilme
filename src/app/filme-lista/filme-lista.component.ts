//import { FilmeDetalhesComponent } from '../filme-detalhes/filme-detalhes.component';
import { Observable } from "rxjs";
import { FilmeService } from '../filme.service';
import { Filme } from '../filme';
import { Router, ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filme-lista',
  templateUrl: './filme-lista.component.html',
  styleUrls: ['./filme-lista.component.less']
})
export class FilmeListaComponent implements OnInit {

   filmes: Observable<Filme[]>;
   f: Observable<Filme[]>;
   tituloFilter: string[];
   formSearch: FormGroup;
   idGenero: number;

  constructor(private fb: FormBuilder, private filmeService: FilmeService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.reloadData();
    // this.getFilmes();

    this.idGenero = this.route.snapshot.params['id'];

    this.formSearch = this.fb.group({
      idGenero: ['']
    });
    


    if(this.idGenero){
      this.filmeService.getFilmeGenero(this.idGenero)
        .subscribe(
          data => {
            console.log(data);
            this.filmes = data;
          },
          error => console.log(error));
    }
    

  }

  reloadData() {
    this.filmes = this.filmeService.getFilmeLista();
    
  }

  getFilmes() {
    this.filmeService.getFilmeLista().subscribe((filmes: Filme[]) => {
      //this.filmes = filmes;
    });
  }

  

  showDeletedMessage: boolean;
  apagaFilme(id: number) {
    if(confirm('Tem certeza que deseja excluir esse filme ?')){
      this.showDeletedMessage = true
      this.filmeService.deleteFilme(id)
        .subscribe(
          data => {
            console.log(data);
            this.reloadData();
          },
          error => console.log(error));
          
      setTimeout(() => this.showDeletedMessage = false, 3000);

    }
  }



  filmeConsulta(id){
    this.router.navigate(['consulta', id]);
   
  }


  updateFilme(id, filme){
    
    this.router.navigate(['editar', id]);
  }
}
