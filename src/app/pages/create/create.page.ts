import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../../services/data/firestore.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  public createUserForm: FormGroup;
  constructor(public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    formBuilder: FormBuilder) {
      /*
      * init form
      */
      this.createUserForm = formBuilder.group({
        userName: ['', Validators.required],
        userEmail: ['', Validators.required],
        userPhone: ['', Validators.required]
      });
    }

  ngOnInit() {
  }

  /*
  * take input from user and send it to firestore service
  */

  async createUser() {
    const loading = await this.loadingCtrl.create();
  
    const userName = this.createUserForm.value.userName;
    const userEmail = this.createUserForm.value.userEmail;
    const userPhone = this.createUserForm.value.userPhone;

    this.firestoreService
    .createUser(userName, userEmail, userPhone)
    .then(
      () => {
        loading.dismiss().then(() => {
          /*
          * navigate to home page after success
          */
          this.router.navigateByUrl('');
        });
      },
      error => {
        console.error(error);
      }
    );


    return await loading.present();
  }
  goBack(){
    /*
    * go back on click go back icon from header
    */
    this.location.back();
  }
}
