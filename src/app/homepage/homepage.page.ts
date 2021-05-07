import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticateService } from '../services/authentication.service';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {

  public itemList: any[];
  public itemListBackup: any[];

  userEmail: string;

  constructor(
    private navCtrl: NavController,
    private route: Router,
    private afs:AngularFirestore,
    private authService: AuthenticateService,

  ){ }

  sell(){
    this.route.navigate(['/sell']);
  }

  favourite(){
    this.route.navigate(['/favourite']);
  }

  allItem(){
    this.route.navigate(['/item']);
  }

   async ngOnInit() {
     this.itemList = await this.initializeItem();

     this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;

      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    })
  }

  async initializeItem() : Promise<any> {

    const itemList = await this.afs.collection('itemList')
    .valueChanges().pipe(first()).toPromise();
    this.itemListBackup = itemList;
    return itemList;

  }

  async filterList(evt) {
    this.itemList = this.itemListBackup;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.itemList = this.itemList.filter(currentItem => {
      if (currentItem.name && searchTerm) {
        return (currentItem.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  }

