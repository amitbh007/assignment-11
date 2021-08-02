import { DOCUMENT } from '@angular/common';
import { Component, Input, OnInit,EventEmitter, Inject } from '@angular/core';
// import * as EventEmitter from 'events';
import { DataService } from 'src/app/data.service';
import { Role, User } from 'src/app/user.model';

@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {

  @Input('index') index:number = 0;
  content:boolean = true;
  
  //mode is used to swith the row between content type or input type
  mode = new EventEmitter<{type:string,index:number}>();


  @Input('user') user!:User;

  outputObject:any= [];
  constructor(private dataService:DataService<User>) {

  }

  ngOnInit(): void {
    // this.mode.emit("content");
    delete (this.user as any).__typename;

    //listening to mode which can be changed on cancel ,save clicks
    this.mode.subscribe(m=>{
      if(m.type == "content"&&m.index == this.index){
        console.log(this.user)

        this.outputObject = Object.keys(this.user).map(key=>{
          // console.log(key,(this.user as any)[key]);
          if(key!="roleKey") { return (this.user as any)[key] }
          else{
            return Role[(this.user as any).roleKey]
          }
        }) ;
        this.content = true;
      }else if(m.type == "edit"&&m.index == this.index){
        this.outputObject = Object.keys(this.user).map((key,i)=>{
        if(key!="roleKey"){
          return `<input autocomplete="off" name="${key}" id="i_${key}${this.index}" class="box-content w-16 px-1 bg-blue-200 py-1 rounded-md" value="${(this.user as any)[key]}" type=""text />`
        }
        else{
          return `<select id="i_roleKey${this.index}" class="inps" name="${key}">
            <option value="0" ${(this.user as any).roleKey==0?'selected':""} >${Role[0]}</option>
            <option value="1" ${(this.user as any).roleKey==1?'selected':""} >${Role[1]}</option>
            <option value="2" ${(this.user as any).roleKey==2?'selected':""} >${Role[2]}</option>
          </select>`
        }})
        this.content = false;
      }
    })

    this.outputObject = Object.keys(this.user).map(key=>{
      // console.log(key,(this.user as any)[key]);
      if(key!="roleKey") { return (this.user as any)[key] }
      else{
        return Role[(this.user as any).roleKey]
      }
    }) ;
  }


  handleCancelClick(){
    this.mode.emit({type:"content",index:this.index});
  }

  handleSaveClick(){
    let input = {};
    Object.keys(this.user).forEach((key)=>{
      input = {...input,[key]:(<HTMLInputElement>document.getElementById(`i_${key}${this.index}`)).value}
    })

    delete (input as any).__typename;
    (input as User).roleKey = Number((input as User).roleKey)

    this.dataService.updateData(input as any,this.user.email)

    console.log("input",input);
    this.mode.emit({type:"content",index:this.index});

  }

  handleEditClick(){
    this.mode.emit({type:"edit",index:this.index});
  }

  handleDeleteClick(){
    this.dataService.deleteData(this.user.email);
  }

}


