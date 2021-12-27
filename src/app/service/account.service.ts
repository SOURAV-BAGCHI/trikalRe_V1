import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient,private router:Router) { }

  // host address
  private hostAddress= config.hostname; //'http://localhost:5000/';

  // url's to access our web api's
  private baseUrlRegister:string=this.hostAddress+'api/account/register';
  
  private baseUrlAuth:string=this.hostAddress+'api/Token/Auth';


  // user related properties
  private loginStatus=new BehaviorSubject<boolean>(this.checkLoginStatus());
  private username=new BehaviorSubject<string>(localStorage.getItem('username'));
  private userrole=new BehaviorSubject<string>(localStorage.getItem('userRole'));

  //Register Method
  register(username:string,password:string,email:string){
    return this.http.post<any>(this.baseUrlRegister,{username,password,email}).pipe(
     map(result=>{
        // registration was successful
          return result;
        },(error: any)=>{
          return error;
        }
      )
    )
  }

  //Login Method
  login(username:string,password:string)
  {
    const grantType="password";
    return this.http.post<any>(this.baseUrlAuth,{username,password,grantType}).pipe(
      map(result=>{
        //console.log(result);
        // Login successful if there's a jwt token in the response
        if(result && result.authToken.token)
        {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.loginStatus.next(true);
            localStorage.setItem('loginStatus','1');
            localStorage.setItem('jwt',result.authToken.token);
            localStorage.setItem('username',result.authToken.username);
            localStorage.setItem('expiration',result.authToken.expiration);
            localStorage.setItem('userRole',result.authToken.roles);
            localStorage.setItem('refreshToken',result.authToken.refresh_token);
            localStorage.setItem('displayname',result.authToken.displayname);
            this.username.next(localStorage.getItem('displayname'));
            this.userrole.next(localStorage.getItem('userRole'));

        }
        return result;
      },(error: any)=>{
        return error;
      })
    );
  }

  // Method to get new refresh token
  getNewRefreshToken():Observable<any>
  {
    let username=localStorage.getItem('username');
    let refreshToken=localStorage.getItem('refreshToken');
    const grantType="refresh_token";

    return this.http.post<any>(this.baseUrlAuth,{username,refreshToken,grantType}).pipe(
      map(result=>{
        if(result && result.authToken.token)
        {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.loginStatus.next(true);
          localStorage.setItem('loginStatus','1');
          localStorage.setItem('jwt',result.authToken.token); //result.authToken.result.token
          localStorage.setItem('username',result.authToken.username); //result.authToken.result.username
          localStorage.setItem('expiration',result.authToken.expiration); //result.authToken.result.expiration
          localStorage.setItem('userRole',result.authToken.roles); //result.authToken.result.roles
          localStorage.setItem('refreshToken',result.authToken.refresh_token); //result.authToken.result.refresh_token
          localStorage.setItem('displayname',result.authToken.displayname);
        }
        return result;
      })
    )
  }

  logout(){
    this.loginStatus.next(false);
    localStorage.setItem('loginStatus','0');
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userRole');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('displayname');

    // this.router.navigate(['/home']);
    this.router.navigate(['/']);
  }

  checkLoginStatus():boolean{
   
    let loginCookie= localStorage.getItem('loginStatus');
   
    if(loginCookie==='1')
    {
      // Get token from local storage
      if(localStorage.getItem('jwt')!==null || localStorage.getItem('jwt')!==undefined)
      {
        return true;
      }
      /*
      const token=localStorage.getItem('jwt');
      const decode=jwt_decode(token);

      // Check if the cookie is valid
      if(decode.exp === undefined)
      {
        return false;
      }

      // Get current date time
      let date=new Date(0);

      // Convert exp time to utc
      let tokenExpDate=date.setUTCSeconds(decode.exp);

      // If value of token time greater than
      if(tokenExpDate.valueOf()>new Date().valueOf())
      {
        return true;
      }
      return false;*/
    }
    return false;
  }

  get isLoggedIn(){
    return this.loginStatus.asObservable();
  }
  
  get currentUserName(){
    return this.username.asObservable();
  }

  get currentUserRole(){
    return this.userrole.asObservable();
  }

}
