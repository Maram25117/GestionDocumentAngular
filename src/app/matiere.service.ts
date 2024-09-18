import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  private readonly apiUrl = 'http://localhost:8084/matiere';

  constructor(private http: HttpClient) {}

  getMatiereById(id: number): Observable<{ id: number, nom: string }> {
    return this.http.get<{ id: number, nom: string }>(`${this.apiUrl}/${id}`);
  }
}
