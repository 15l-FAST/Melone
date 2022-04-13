import { Component, OnInit } from '@angular/core';
import {NgForm,} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ShareKeyService } from '../Service/share-key.service';

import { MatDialogRef } from '@angular/material/dialog';
import { keyframes } from '@angular/animations';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})


export class KeyComponent implements OnInit {

  _key:string="abcde";
  value="";
message:string="";
isMatch:boolean=false;

  constructor(public dialogRef: MatDialogRef<KeyComponent>, private Service:ShareKeyService,private http: HttpClient ) { }

enterKey(val:string)
{
this.value=val;
console.log("key entered by the user:",this.value);
this.Service.setKey(this.value);

//send the value to the server here
this.Service.GetResult(this.value);

this.closeDialog();
if(this.value===this._key)
{
  this.message="keys match";
  this.isMatch=true;
  this.Service.setMessage(this.message,this.isMatch);
  this.Service.setTimerFlag(true);
    console.log("keys match");
}
else{
  this.message="wrong key";
  this.isMatch=false;
  this.Service.setMessage(this.message,this.isMatch);
  console.log("wrong key");
}
//return this.message;
}
closeDialog()
{
  this.dialogRef.close();

}
  ngOnInit(): void {

  }

  //POST key method to post
// addKey(val:String){
// return this.http.post("localhost:4200",val );
// }

// //GET



}
