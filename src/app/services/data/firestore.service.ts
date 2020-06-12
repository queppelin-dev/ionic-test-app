import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/user.interface';
import { AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) { }
/*
* send data to firestore to save 
*/
  createUser(
    userName: string,
    userEmail: string,
    userPhone: string,
  ): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`users/${id}`).set({
      id,
      userName,
      userEmail,
      userPhone
    });
  }
  /*
  * return collection object of all users
  */
  getUsers(): AngularFirestoreCollection<User> {
    return this.firestore.collection(`users`);
  }
  /*
  * delete user by id
  */
  deleteSong(userId: string): Promise<void> {
    return this.firestore.doc(`users/${userId}`).delete();
  }

  

}
