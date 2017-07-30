import { Component, OnDestroy } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, RequestMethod  } from '@angular/http';

import { CloudinaryOptions, CloudinaryUploader, CloudinaryImageComponent } from 'ng2-cloudinary';



@Component({
    selector: 'profile',
    templateUrl: '/partial/profileComponent',
})

export class ProfileComponent {

    public user: UserProfile;

    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({ cloudName: 'dr4opxk5i', uploadPreset: 'ajvv2x7e' })
    );

    constructor(private http: Http) {
        http.get('/api/api/city/').subscribe(result => {
            this.user = result.json();
            if (this.user.urlPhoto == null)
                this.user.urlPhoto = "j8khmafnd7hbxwpxy0kb";
            console.log(this.user);
        });

        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
            let res: any = JSON.parse(response);          
            this.user.urlPhoto = res.public_id;              
            return { item, response, status, headers };
        };
    }

    onChange(event: any) {      
        this.uploader.uploadAll();
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
