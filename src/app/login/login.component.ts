import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';
import { Injectable } from '@angular/core';
//import { SmsClient } from '@azure/communication-sms';
 
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
    usernamepromt: string = '';
 
    passwordpromt: string = '';
 
    passwordVisible: boolean = false;
 
    isLoggedIn: boolean = false;
 
    loggedInUser: string = "";
 
    username: string = "";
 
    user: any;
 
    loginuser: any;
 
    password: string = "";
 
    show: boolean = false;
 
    public screenHeight: number = 0;
 
    public screenWidth: number = 0;
 
    isPortrait: boolean = true;
 
    message: string = "";
 
    ipaddress: string = "";
 
    role: string = "";
 
    clientid: string = "";
   
    /*  private smsClient: SmsClient;*/
 
    constructor(private router: Router ,private http: HttpClient, private authService: MsalService) {
 
      /*  this.smsClient = new SmsClient('YOUR_ACS_CONNECTION_STRING');*/
 
    }
   
    //async sendOtp(phoneNumber: string, otp: string): Promise<void> {
 
    //  try {
 
    //    const sendResults = await this.smsClient.send({
 
    //      from: "+1XXXXXXXXXX", // Your ACS phone number
 
    //      to: [phoneNumber],
 
    //      message: `Your OTP is: ${otp}`,
 
    //    });
   
    //    for (const result of sendResults) {
 
    //      if (result.successful) {
 
    //        console.log('Message sent successfully to', result.to);
 
    //      } else {
 
    //        console.error('Failed to send message to', result.to, result.errorMessage);
 
    //      }
 
    //    }
 
    //  } catch (error) {
 
    //    console.error('Error sending OTP:', error);
 
    //  }
 
    //}
 
    generateOtp(length: number = 6): string {
 
      const digits = '0123456789';
 
      let otp = '';
 
      for (let i = 0; i < length; i++) {
 
        otp += digits[Math.floor(Math.random() * 10)];
 
      }
 
      return otp;
 
    }
 
    //sendOtptocustomer() {
 
    //  const otp = this.generateOtp();
 
    //  this.sendOtp('+1234567890', otp); // replace with user's phone number
 
    //}
 
    doSomething() {
 
      this.show = !this.show;
 
    }
 
    getUser() {
 
      const account = this.authService.instance.getActiveAccount();
 
      if (account) {
 
        // Use account information
 
        console.log(account.username);
 
      }
 
    }
 
    togglePasswordVisibility(): void {
 
      this.passwordVisible = !this.passwordVisible;
 
      const passwordInput = document.getElementById('password') as HTMLInputElement;
   
      if (this.passwordVisible) {
 
        passwordInput.type = 'text';
 
      } else {
 
        passwordInput.type = 'password';
 
      }
 
    }
 
    loginpromt() {
 
      if (this.usernamepromt == 'Admin' && this.passwordpromt == 'admin#@1234') {
 
        this.router.navigate(['ai']);
 
      } else {
 
        window.alert('Invalid Username and password');
 
      }
 
    }
 
    ngOnInit() {
 
      this.authService.instance.initialize().then(() => {
 
        // MSAL is initialized
 
        console.log('MSAL initialized');
 
      }).catch(error => {
 
        console.error('MSAL initialization failed', error);
 
      });
 
    }
 
    logout() {
 
      this.authService.logout().subscribe({
 
        next: () => {
 
          console.log('Logout successful');
 
          this.isLoggedIn = false;
 
          this.loggedInUser = '';
 
          this.router.navigate(['/login']);
 
        },
 
        error: (error) => {
 
          console.error('Logout failed', error);
 
        }
 
      });
 
    }
 
    fetchIpAddress() {
 
      this.http.get('https://ipv4.jsonip.com/').subscribe((dataip: any) => {
 
        this.ipaddress = dataip.ip;
 
      });
 
    }
 
    login() {
 
      this.authService.loginPopup()
 
        .subscribe({
 
          next: (result) => {
 
            console.log(result);
 
            // Handle successful login
 
            this.router.navigate(['mainpage']);
 
          },
 
          error: (error) => console.log(error)
 
        });
 
    }
 
    logindata(): void {
 
      this.router.navigate(['mainpage']);
 
    }
   
    userdata(username: string, password: string) {
 
      let params1 = new HttpParams().set('Username', username).set('Password', password).set('IpAddress', this.ipaddress);
 
      return this.http.get("https://makpowerwebservice.azurewebsites.net/Loaduserdetails", { params: params1 });
 
    }
 
}