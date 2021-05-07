import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';

@Component({
  selector: 'app-itemdisplay',
  templateUrl: './itemdisplay.page.html',
  styleUrls: ['./itemdisplay.page.scss'],
})
export class ItemdisplayPage implements OnInit {

  userEmail:string;

  constructor(
    private authService: AuthenticateService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {

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

}
