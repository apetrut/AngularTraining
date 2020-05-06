import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  // @Input() valuesFromWelcome: any;
  registerForm: FormGroup;
  errorMessage: string;
  pageTitle: 'Register new user';

  constructor(private fb: FormBuilder, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  register() {
    this.authService.register(this.registerForm.value)
      .subscribe(() => {
        this.alertify.success('registration successful');
      }, error => {
        this.alertify.error(error);
      });
  }

  cancel(){
    this.alertify.message('cancelled');
  }

}
