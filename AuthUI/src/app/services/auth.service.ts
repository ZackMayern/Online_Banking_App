import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl:string = "https://localhost:7073/api/User/";
  private userPayload:any;
  constructor(private http : HttpClient, private router : Router) { 
    this.userPayload = this.decodedToken();
  }

  signUp(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`, userObj)
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}authenticate`, loginObj)
  }

  storeToken(tokenValue:string){
    localStorage.setItem('token', tokenValue);
  }

  storeRole(role:string){
    localStorage.setItem('role', role)
  }

  getRole(){
    return localStorage.getItem('role');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token');
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken(){
    if(this.userPayload){
      return this.userPayload.unique_name;
    }
  }

  getRoleFromToken(){
    if(this.userPayload){
      return this.userPayload.role;
    }
  }
}