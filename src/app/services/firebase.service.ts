import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from "firebase/app";
import "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'itemList';

  constructor(
    private firestore: AngularFirestore
  ) { }

  createItem(record,item_id) {
    return this.firestore.collection(this.collectionName).doc(item_id).set(record);

  }

  favItem(record,item_id){
    return this.firestore.collection(this.collectionName).doc(item_id).set(record);
  }

  readItem() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  updateItem(recordID, record) {
    this.firestore.doc(this.collectionName + '/' + recordID).update(record);
  }

  deleteItem(record_id) {
    this.firestore.doc(this.collectionName + '/' + record_id).delete();
  }

  updateItemID(uid,item_id){

    this.firestore.collection('People').doc(uid).update({
      'items':firebase.firestore.FieldValue.arrayUnion(item_id)
    });
  }

  updateFavID(uid,item_id){
    this.firestore.collection('People').doc(uid).update({
      'favourite':firebase.firestore.FieldValue.arrayUnion(item_id)
    });
  }








}
