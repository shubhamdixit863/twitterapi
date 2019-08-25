import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import decode from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:SharedService,  private route: ActivatedRoute,
    private router: Router) { }


  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submit() {
   this.service.login(this.form.value.username,this.form.value.password).subscribe(data=>{
  
    if(data.token)
    {  
      // checking if the token is present
      // saving the token inside  localstorage
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      localStorage.setItem('token', JSON.stringify(data.token));
      const tokenPayload = decode(data.token);
      console.log("payload"+JSON.stringify(tokenPayload));
      
        console.log("executed");
        console.log("executed",data.role);
        this.router.navigate(['/home']);
        console.log("executed",data.role);
      

     
    }


   })
  }

 
  ngOnInit() {
  }

}
