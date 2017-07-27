import { Component, OnDestroy } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, RequestMethod  } from '@angular/http';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';



@Component({
    selector: 'profile',
    templateUrl: '/partial/profileComponent',
})




export class ProfileComponent {

    private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',

    };

    // Initialized to specific date (09.10.2018).
 

 
    public user: UserProfile;

    constructor(private http: Http) {
        http.get('/api/api/city/').subscribe(result => {
            this.user = result.json();
            console.log(this.user);
        });
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
