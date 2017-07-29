import { Component, OnDestroy } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, RequestMethod  } from '@angular/http';
import { RestServiceComponent } from "./service/RestService";




@Component({
    selector: 'profile',
    templateUrl: '/partial/profileComponent',
    providers: [RestServiceComponent],
})




export class ProfileComponent {

    public user: UserProfile;

    constructor(private http: Http,private service:RestServiceComponent) {
        http.get('/api/api/city/').subscribe(result => {
            this.user = result.json();
            console.log(this.user);
        });
        console.log("asdad");
        console.log(service.getUserById("e1022723-7508-40a4-9b99-c52785241552"));
        console.log(service.getUserById("sadf"));
    }

 

    changeField: boolean = true;

    change(): void {
        this.changeField = !this.changeField;
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        console.log("sergey byu");
        let body = JSON.stringify(this.user);
        let headers = new Headers({ 'Content-Type': 'application/json'  });

        this.http.post("api/api/editProfile", body, { headers: headers })
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
    id: string;
    firstName: string;
    secondName: string;
    urlPhoto: string;
    rating: number;
    country: string;
    city: string;
    dataOfBirth: string;
    aboutMySelf: string;
}
