import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FilmeService } from '../filme.service';
import { Filme } from '../filme';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.less']
})

export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  submitted = false;
  filme: Filme = new Filme();
  id: number;
  form: FormGroup;
  consulta: boolean;
  showButton: boolean
  nomePagina = 'Adicionar Filme';

  constructor(
    private fb: FormBuilder,
    private filmeService: FilmeService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];
    // Definindo nome para exibir na página
    
    if (this.id && window.location.href.includes('consulta')) {
      this.nomePagina = 'Consulta Filme';
      this.showButton = true;
      this.consulta = true;
    } else if (this.id) {
      this.nomePagina = 'Editar Filme';
    }


    this.form = this.fb.group({
      id: [''],
      titulo: ['', Validators.required],
      diretor: ['', Validators.required],
      genero:  ['', Validators.required],
      sinopse: ['', Validators.maxLength(500)],
      ano: ['', Validators.compose([Validators.pattern('[0-9]{4}')])]
    });

    // busca filme pelo ID
    this.filmeService.getFilmeId(this.id)
    .subscribe(data => {
      console.log(data);
      this.filme = data;
    }, error => console.log(error));

  }

  hasError(field: string) {
    return this.form.get(field).errors;

  }


  onSubmit() {

    
    if (this.form.valid) {

      if (this.id != null) {
          // atualiza filme
          this.filmeService.updateFilme(this.filme.id, this.form.value).subscribe(
            success => {
              alert('Filme atualizado com sucesso!');
              this.location.back();
            },
            error => console.log(error));
      } else {
        // add filme
        this.submitted = true;
        this.filmeService.addFilme(this.form.value).subscribe(
          success => {
            alert('Filme adicionado com sucesso!');
            this.location.back();
          },
          error => console.log(error));

      } // fim if

    } else {
      // form invalido
      return;
    }// fim if
    

  }// fim onSubmit()
  
  onCancel() {
    this.submitted = false;
    if (this.id != null) {
      this.location.back();
    } else {
      this.form.reset();
    }
  }
}