import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

  userEmail:String;
  public favID: Array<any>;
  public favLists: Array<any>;
  userUID: string;




  constructor(
    private navCtrl: NavController,
    private route: Router,
    private authService: AuthenticateService,
    private firestore: AngularFirestore,
    private firebaseService: FirebaseService,

  ) { }

  itemdisplay(){
    this.route.navigate(['/itemdisplay']);
  }

  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
        this.userUID = res.uid;
        this.favID = [];
        this.favLists = [];


        this.firestore.collection('People').doc(res.uid).get().toPromise().then(res => {
          for (var i = 0; i < res.data()['favourite'].length; i++) {
            this.favID.push(res.data()['favourite'][i]);
            this.firestore.collection('itemList').doc(res.data()['favourite'][i])
            .get()
            .toPromise()
            .then(res => {
              // console.log("please jadi",res.data());
              this.favLists.push(res.data());
              console.log("ni please please", this.favLists)
            })
          }
          console.log("finall",this.favLists);
          // this.itemLists.push(res.data()['items']);
        });

      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })

  }

 

}
