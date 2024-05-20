import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }


  getUsers(page:number,limit:number): Observable<any>{
    return this.http.get(`http://localhost:3000/api/users?page=${page}&results=${limit}&seed=abc`)
  }
}
