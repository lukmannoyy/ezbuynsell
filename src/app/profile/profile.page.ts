import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userEmail: string;
  username: string;
  matricno: string;
  phone: string;
  uid: string;
  Item: string;
  Condition: string;
  Description : string;
  Price : string;
  public itemID: Array<any>;
  public itemLists: Array<any>;



  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    public firestore: AngularFirestore,
    private route: Router,
  ) { }

  ngOnInit() {

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;

        //get data from firestore based on current required user
        this.firestore.collection("People").doc(res.uid).get()
        .toPromise() //guna utk enable pakai then
        .then(res => {
          this.username = res.data()['username'];
          this.matricno = res.data()['matricno'];
          this.phone = res.data()['phone'];


        })

      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
        this.uid = res.uid;
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
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }

  itemdisplay(){
    this.route.navigate(['/itemdisplay']);
  }
}
