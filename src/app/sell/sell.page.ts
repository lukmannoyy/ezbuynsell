import { Component } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { AlertController, NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import * as uuid from 'uuid';


interface ItemData {
  Item: string;
  Price: string;
  Condition: string;
  Description: string;
}

@Component({
  selector: 'app-sell',
  templateUrl: 'sell.page.html',
  styleUrls: ['sell.page.scss'],
})
export class SellPage {

  itemList = [];
  itemData: ItemData;
  itemForm: FormGroup;
  userEmail: string;
  People: string;
  userUID: string;
  public itemLists: Array<any>;
  public itemID: Array<any>;



  constructor(
    private firebaseService: FirebaseService,
    public fb: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private alertCtrl : AlertController
  ) {
    this.itemData = {} as ItemData;
    this.People = {} as string;
  }

  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
        this.userUID = res.uid;
        console.log(res.uid);
        this.itemID = [];
        this.itemLists = [];

        // get current user
        this.firestore.collection('People').doc(res.uid).get().toPromise().then(res => {
          for (var i = 0; i < res.data()['items'].length; i++) {
            this.itemID.push(res.data()['items'][i]);
            this.firestore.collection('itemList').doc(res.data()['items'][i])
            .get()
            .toPromise()
            .then(res => {
              // console.log("please jadi",res.data());
              this.itemLists.push(res.data());
              console.log("ni please please", this.itemLists)
            })
          }
          console.log("finall",this.itemLists);
          // this.itemLists.push(res.data()['items']);
        });


      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })

    this.itemForm = this.fb.group({
      Item: ['', [Validators.required]],
      Price: ['', [Validators.required]],
      Condition: ['', [Validators.required]],
      Description: ['', [Validators.required]],

    })


  }

  async CreateItemRecord() {
    const item_id = uuid.v4();
    const record = this.itemForm.value;
    record.isEdit = true;
    record['uid'] = item_id;
    console.log("ni uid custom", record);
    this.firebaseService.createItem(this.itemForm.value,item_id).then(resp => {
      this.itemForm.reset();
    })
      .catch(error => {
        console.log(error);
      });

    //add the iteam id in user's items arary
    this.firebaseService.updateItemID(this.userUID,item_id);
    //popup message
    await this.alertCtrl.create({
      header: "Item have been sell",
      message: "Refresh and Check on your Profile",
      buttons: [
        {text: "Dismiss"}
      ]
    }).then(res => res.present())


  }



  RemoveItemRecord(rowID) {
    this.firebaseService.deleteItem(rowID);
  }

  EditItemRecord(record) {
    record.isEdit = true;
    record.EditItem = record.Item;
    record.EditPrice = record.Item;
    record.EditConditon = record.Condition;
    record.EditDescription = record.Description;
  }

  UpdateItemRecord(recordRow) {
    let record = {};
    record['Item'] = recordRow.EditItem;
    record['Price'] = recordRow.EditPrice;
    record['Condition'] = recordRow.EditItem;
    record['Description'] = recordRow.EditDescription;
    this.firebaseService.updateItem(recordRow.id, record);
    recordRow.isEdit = false;
  }

}
