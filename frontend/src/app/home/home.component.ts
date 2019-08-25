import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private service :SharedService,private router: Router) { }

  statuses:any[]
  box = {
    display:"none" 
   }

  search(value ,date)
  {
    let tempdate=moment(date,"DD/MM/YYYY").format("YYYY-MM-DD")
//console.log(tempdate);
    if(value=="" || date==""){
      alert("You need to enter some values");
    }

    else{
      // Passing request to server to fetch the data 
      this.box.display="block";
     this.service.getTwitterdata(value,tempdate).subscribe(data=>{
       //console.log(JSON.stringify(data));
       this.statuses=data["statuses"];
       this.box.display="none";
     })
    }
    
  }

  logOut()
{
this.service.logout();
this.router.navigate(['/']);
}
  ngOnInit() {
  }

}
