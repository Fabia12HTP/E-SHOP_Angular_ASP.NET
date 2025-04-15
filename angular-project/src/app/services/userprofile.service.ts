import { Inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  private userProfileUrl = this.baseUrl + "/UserProfile";
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getUserInfo() {
    return this.http.get<User>(this.userProfileUrl);
  }
}
