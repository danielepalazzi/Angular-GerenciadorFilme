import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from './filme';
import { catchError, tap, take } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  private baseUrl = 'http://localhost:8080/api/filmes'; // URL do serviço springboot

  constructor(private http: HttpClient) {}

  getFilmeLista(): Observable<any> {
    return this.http.get(this.baseUrl).pipe(take(1));
  }


  getFilmeId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`).pipe(take(1));
  }

  updateFilme(id, filme): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, filme, httpOptions).pipe(
      tap(_ => console.log(`atualizou o filme com id=${id}`))
    );
  }

  addFilme(filme): Observable<Filme> {
    return this.http.post<Filme>(`${this.baseUrl}`, filme, httpOptions).pipe(
      tap((filme: Filme) => console.log(`adicionou o filme com id=${filme.id}`))
    );
  }

  deleteFilme(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getFilmeGenero(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/${id}`).pipe(take(1));
    console.log(`search o filme com id=${id}`);
  }
  

}
