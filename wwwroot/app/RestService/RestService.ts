import "rxjs/Rx"
import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, RequestMethod } from '@angular/http';

@Component({
 
})

@Injectable()
export class RestService {


    constructor(private http: Http) {
        
    }

    public getUserById(id: string) {
        return this.http.get('api/getUserById/' + id);
    }

    
    public editProfile(user: UserProfile) {
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.http.post("api/editProfile", body, { headers: headers })
            .subscribe(
            (data) => {
                console.log('Response received');
                console.log(data);
            },
            (err) => { console.log('Error'); },
            () => console.log('Authentication Complete')
            );
    }


}

class UserProfile {
    id: number;
    idUser: string;
    firstName: string;
    secondName: string;
    urlPhoto: string;
    rating: number;
    country: string;
    city: string;
    dataOfBirth: string;
    aboutMySelf: string;
}
