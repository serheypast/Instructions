import { Component, OnDestroy } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, RequestMethod  } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { Subscription } from 'rxjs/Subscription';
import { RestService } from "./../RestService/RestService";

@Component({
    selector: 'profile',
    templateUrl: '/partial/profileComponent',
    providers: [RestService],
})




export class ProfileComponent {

    // Initialized to specific date (09.10.2018).
 
    private id: number;
    private subscription: Subscription;
    public user: UserProfile;

    constructor(private http: Http, private activateRoute: ActivatedRoute, private service: RestService) {
        this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
        console.log(this.id);
        service.getUserById(this.id.toString()).subscribe(result => {
            this.user = result.json();
        });
    }


    changeField: boolean = true;

    change(): void {
        this.changeField = !this.changeField;
    }

    ngOnDestroy() {
        this.service.editProfile(this.user);
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
