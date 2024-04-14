import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Shoes } from '../interfaces/shoes';
import { ShoesCombine } from '../interfaces/shoes-combine';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoesService {

  private homeUrl = this.baseUrl + "/home";
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getShoeList() {
    return this.http.get<Shoes[]>(this.homeUrl);
  }
  
  getShoeDetailsList(detailPageId: number): Observable<ShoesCombine[]> {
    return this.http.get<ShoesCombine[]>(this.homeUrl + detailPageId);
  }
}