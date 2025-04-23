import { Inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  private userProfileUrl = this.baseUrl + "/UserProfile";
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(this.userProfileUrl);
  }

  uploadProfilePicture(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.userProfileUrl}/upload-profile-picture`, formData);
  }
}
