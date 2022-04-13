import { Injectable } from '@angular/core';
import { KeyComponent } from '../key/key.component';
import { TimerComponent } from '../timer/timer.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareKeyService {

entered_key: string="";
message:string="";
isMatch:boolean=false;
stopTimer:boolean=false;
key_matched=false;

setKey(key:string)
{
  this.entered_key=key;
  console.log("key recieved by server: ",this.entered_key);
}
getKey()
{
  return this.entered_key;
}

getMessage()
{
  return this.message;
}

setMessage(msg:string, match:boolean)
{
  this.message=msg;
  this.isMatch=match;
}

Stop_Timer()
{
  if(this.key_matched==true)
  {
    this.stopTimer=true;
  }
  return this.stopTimer;
}

setTimerFlag(timer:boolean)
{
  this.key_matched=timer;
 }

getMatch()
{
  return this.isMatch;
}
constructor(private http: HttpClient) { }


  //POST key method to post
// addKey(val:String){
// return this.http.post("localhost:4200",val);
// }

//Get
// get the response string: whether the character entered was right or wrong
//incasew its right, display the character on screen,
//incase its wrong, display hangman
GetResult(query:string)
{
  const url="localhost:4200";
  return this.http.get('${this.url}?q=${query}')
  .pipe(
    map((response: any) => response.items)
  );
}


}

