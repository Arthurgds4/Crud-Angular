import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlimentoElement } from '../models/AlimentoElement';

@Injectable()
export class AlimentoElementService {
  elementApiUrl = '';
  constructor(private http: HttpClient) { }

  getElements(): Observable<AlimentoElement[]>
  {
    return this.http.get<AlimentoElement[]>(this.elementApiUrl);
  }

  createElement(element: AlimentoElement): Observable<AlimentoElement> {
    return this.http.post<AlimentoElement>(this.elementApiUrl, element);
  }

  editElement(element: AlimentoElement): Observable<AlimentoElement>{
    return this.http.put<AlimentoElement>(this.elementApiUrl, element);
  }

  /*deleteElement(id: number): Observable<any> {
    return this.http.delete<any>(`${this.elementApiUrl}?id=${id}`);
  }*/
}
