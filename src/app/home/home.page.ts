import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './../models/user.interface';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from './../services/data/firestore.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public users;
  public noUsers = false;
  public view = 'table';
  constructor(private firestoreService: FirestoreService,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,) {}

  
  ngOnInit(){
    /*
    * Check for current view if stored in localstorage
    */
    var view = localStorage.getItem('view');
    if(view != undefined || view != null){
      this.view = view;
    }
    /*
    * Get all users
    */
    this.getUsers();
  }

  getUsers(){
    /*
    * calling firestore service function to get all data stored over firestore
    */
    this.users = this.firestoreService.getUsers().valueChanges();
  }

  async deleteUser(userId) {

    /*
    * Showing alert before deleting the user
    */
    const alert = await this.alertController.create({
      message: 'Are you sure you want to delete the user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: blah => {
            /*
            * nothing to do on cancel
            */
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            /*
            * delete the user from the database
            */
            this.firestoreService.deleteSong(userId).then(() => {
              /*
              * remove the user from current array of users by id
              */
              this.users = this.removeByAttr(this.users, 'id',userId);
            });
          },
        },
      ],
    });
  
    await alert.present();
  }
/*
* remove the user from current array of users by id
*/
  removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 
           arr.splice(i,1);
       }
    }
    return arr;
  }

  /*
  * toggle view b/w 'card' and 'table' on click
  */
  changeView(){
    if(this.view == 'table'){
      this.view = 'card';
    }else{
      this.view = 'table';
    }
    localStorage.setItem('view',this.view)
  }
}
