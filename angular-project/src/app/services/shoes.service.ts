import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Shoes } from '../interfaces/shoes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoesService {

  private homeUrl = this.baseUrl + "/home";
  private detailPageUrl = this.homeUrl + "/detail";
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getShoeList() {
    return this.http.get<Shoes[]>(this.homeUrl);
  }
  
  getShoeDetailsList(page: number): Observable<Shoes[]> {
    const url = `${this.detailPageUrl}?page=${page}`;
    return this.http.get<Shoes[]>(url);
  }
}
