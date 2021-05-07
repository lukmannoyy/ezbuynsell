import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ],
    'username': [
      { type: 'required', message: 'Name is required.' },

    ],
    'matricno': [
      { type: 'required', message: 'Matric No. is required.' },

    ],
    'phone': [
      { type: 'required', message: 'Phone No. is required.' },

    ],
  };

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    public firestore: AngularFirestore


  ) { }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      username:new FormControl('', Validators.compose([
        Validators.required,

      ])),
      matricno: new FormControl('', Validators.compose([
        Validators.required,

      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,

      ])),
    });
  }

  tryRegister(value) {
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);

        this.firestore.collection('People').doc(res.user.uid).set(
          {
            id: this.firestore.createId(),
            email: value.email,
            username:value.username,
            phone: value.phone,
            matricno: value.matricno,

          }
        )



        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please log in.";

      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })


  }



  goLoginPage() {
    this.navCtrl.navigateBack('/login');
  }





}
