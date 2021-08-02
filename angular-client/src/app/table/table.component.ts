import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../user.model';

class genericTableComponent<T>{

}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild('maintable',{static: false}) mainTable:ElementRef;

  users:User[] = [];
  headings:any[] = [];
  @Input('show') show:boolean = false;

  constructor(private dataService:DataService<User>,private renderer:Renderer2) { }

  ngOnInit(): void {

    // add dynamic headings
    const args = new User("null");
    this.headings = Object.keys(args)
    this.headings.push("options");


    this.dataService.fetchData.subscribe(data=>{
      this.users = data;
    })
    
  }

}
