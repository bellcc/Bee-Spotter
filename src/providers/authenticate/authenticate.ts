import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

export class User {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

@Injectable()
export class AuthenticateProvider {
  currentUser: User;

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello AuthenticateProvider Provider');
  }

  public login(username: string, password: string) {
    if (username == null || password == null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // let headers = {'content-type': "application/x-www-form-urlencoded"};

        let payload = new FormData();
        payload.append("username", username);
        payload.append("password", password);

        // "https://dev.api.beespotter.org/api/v1/auth"
        this.http.post("/api/v1/auth", payload)
          .map(res => res.json())
          .subscribe( data => {
            if (data["auth_result"]) {
              this.currentUser = new User(username, password);
            }

            this.storage.set("auth_token", data["auth_token"]);

            observer.next(data);
            observer.complete();
          },
          error => {
            observer.next(false);
            observer.complete();
          });
      });
    }
  }
}
