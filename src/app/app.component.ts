import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { KeyComponent } from './components/key/key.component';
import { TimerComponent } from './components/timer/timer.component';
import { ShareKeyService } from './components/Service/share-key.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

  // new test comment 123

export class AppComponent {
  title = 'counter';
message:string="";
  constructor(public matDialog: MatDialog, private Service:ShareKeyService) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(KeyComponent, dialogConfig);

    this.Check_key();
  }

  Check_key()
  {

      this.message=this.Service.getMessage();
      return this.message;

  }
}
