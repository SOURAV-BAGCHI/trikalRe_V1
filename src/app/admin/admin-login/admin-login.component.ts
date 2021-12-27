import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private acct:AccountService,
              private router:Router,
              private route:ActivatedRoute) { }

  phone:string='';
  password:string='';
  returnUrl:string;
  invalidLogin:boolean=false;
  errorMessage:string;
  isRequestInProcess:boolean=false;


  ngOnInit(): void {
    this.acct.isLoggedIn.subscribe(res=>{
      if(res)
      {
        this.router.navigateByUrl('/admin/current-booking'); 
      }
    })
    this.returnUrl=this.route.snapshot.queryParams['returnUrl'] || '/admin/current-booking';
    console.log(this.returnUrl);
  }

  onSubmit()
  {
    this.isRequestInProcess=true;
    this.acct.login(this.phone,this.password).subscribe(result=>{
      let token=(<any>result).authToken.token;
      this.invalidLogin=false;
      this.isRequestInProcess=false;
      this.router.navigateByUrl(this.returnUrl);
    },
    error=>{
      this.invalidLogin=true;
      this.isRequestInProcess=false;
      this.errorMessage="Invalid details supplied. Could not log in";

      setTimeout(() => {
        this.invalidLogin=false;
      }, 5000);
      // console.log(error.status);
    })
  }

}
