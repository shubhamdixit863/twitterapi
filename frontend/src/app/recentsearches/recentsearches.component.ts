import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recentsearches',
  templateUrl: './recentsearches.component.html',
  styleUrls: ['./recentsearches.component.css']
})
export class RecentsearchesComponent implements OnInit {

  constructor(private service:SharedService) { }
tweets:any[];

  ngOnInit() {
    this.service.getRecentSearches().subscribe(data=>{
      console.log(JSON.stringify(data));
      this.tweets=data["data"];
    })
  }

}
