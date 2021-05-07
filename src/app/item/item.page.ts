import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../services/authentication.service';
import { AlertController, NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  userEmail:string;
  userUID: string;
  public itemLists: Array<any>;
  Condition: string;
  Description: string;
  Item: string;
  Price: string;
  public favList: Observable<any>;

  constructor(
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
    private firebaseService: FirebaseService,
    private alertCtrl : AlertController,
    private route: Router,

  ) { }

  ngOnInit() {
    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
        this.userUID = res.uid;

        this.favList = this.firestore
        .collection('itemList')
        .valueChanges({idField : 'itemID'})


        this.firestore.collection("itemList")
        .get()
        .toPromise()
        .then(res => {
            console.log("ni id", res)

            this.itemLists = [];

            res.forEach(doc => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                // console.log("ni id dia", doc.data())
                this.itemLists.push(doc.data());

            });


        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });







      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })
  }

  async favouriteItem(userUID,itemID){

    this.firebaseService.updateFavID(userUID,itemID);
    // console.log(userUID);


    await this.alertCtrl.create({
      header: "Item favourited",
      message: "Refresh and Check on your Favourite Item",
      buttons: [
        {text: "Dismiss"}
      ]
    }).then(res => res.present())



  }

  itemdisplay(){
    this.route.navigate(['/itemdisplay']);
  }

}
