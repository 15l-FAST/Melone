import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Time } from '@angular/common';
import { Component, OnInit , OnDestroy} from '@angular/core';
import { Subscription, interval, filter, takeUntil, from } from 'rxjs';
import { ShareKeyService } from '../Service/share-key.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription;
  actual_key:string="abcde";

  public dateNow = new Date();
  public dDay = new Date("2022-04-13 15:13:00");
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  public timeDifference=0;
  public secondsToDday=0;
  public minutesToDday=0;
  public hoursToDday=0;
  public daysToDday =0;

key:string="";
right_key:boolean=false;
message:string ="";
stop:boolean=false;

constructor(private Service:ShareKeyService,private http: HttpClient){}

    private getTimeDifference () {


console.log("dday"+this.dDay);
console.log("new"+(new Date().getTime()));


if((this.timeDifference = this.dDay.getTime() - new Date().getTime())==0)
        {
          this.ngOnDestroy();
        }

else if(this.timeDifference<=0){
  console.log(this.timeDifference);
  this.ngOnDestroy();
}
 else
 {
  this.timeDifference = this.dDay.getTime() - new Date().getTime();
 }

        this.allocateTimeUnits(this.timeDifference);
       // console.log(this.timeDifference);

    }

  private allocateTimeUnits (timeDifference: any) {
        this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
        this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
        this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
        this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
  }
check_the_key()
{
  if(this.right_key===true)
  {
    this.message="Congradulations!!!!"+"\n"
    "stop timer";
    this.stop=this.Service.Stop_Timer();
    if(this.stop===true)
    {
      this.subscription.unsubscribe();

    }
  }

  else
  {
    this.message="Sorryy!!!!";
  }

}

  ngOnInit():void{

    this.subscription = interval(1000)

    .subscribe(x => {

        this.getTimeDifference();
        this.key=this.Service.getKey();
        this.right_key=this.Service.getMatch();
this.check_the_key();
        console.log("attained key ",this.key );
      });


  }

  ngOnDestroy(): void {
    console.log("time to unsubscribe");
     this.key=this.Service.getKey();
    console.log("attained key ",this.key );
    this.subscription.unsubscribe();

  }

}

