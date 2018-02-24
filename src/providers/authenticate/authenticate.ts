import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


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

  constructor(public http: Http) {
    console.log('Hello AuthenticateProvider Provider');
  }

  public login(username: string, password: string) {
    if (username == null || password == null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let headers = {'content-type': "application/x-www-form-urlencoded"};

        let payload = new FormData();
        payload.append("username", username);
        payload.append("password", password);

        /**
        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);
         */

        this.http.post("http://localhost:8100/api/v1/auth", payload, headers)
          .map(res => res.json())
          .subscribe( data => {
            if (data["auth_result"]) {
              this.currentUser = new User(username, password);
            }

            observer.next(data["auth_result"]);
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
