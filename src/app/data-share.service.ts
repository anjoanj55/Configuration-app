import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  iplist:any='';
  constructor() { }

  sendipdetails(iplist: string) {
    this.iplist = iplist
  }

  
  getipdetails() {
    return this.iplist
  }
}
