import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: Http) {
    console.log('Hello UserProvider Provider');
  }

  public get_user_info(token: string) {
    return Observable.create(observer => {
      const headers = new Headers();
      headers.append('Content-Type', "application/x-www-form-urlencoded");
      headers.append('X-BeeSpotter-Token', token);

      const options = new RequestOptions({headers: headers});

      // https://dev.api.beespotter.org/api/v1/users/me
      this.http.post("/api/v1/users/me", options)
        .map(res => res.json())
        .subscribe( data => {
            console.log(data);

            observer.next(data);
            observer.complete();
          },
          error => {
            console.log(error);

            observer.next(false);
            observer.complete();
          }
        );
    });
  }
}
