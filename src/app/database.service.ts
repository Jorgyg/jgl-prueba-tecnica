import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) { }

  return(): Observable<any> {
    let urls: string[] = [];
    for (let i = 1; i <= 600; i++) {
      urls.push(`${this.apiUrl}${i}.png`);
    }
    return this.http.get(this.apiUrl);
  }

  getPokemonById(id: number): Observable<any> {
    return this.http.get(this.apiUrl + id);
  }
}
