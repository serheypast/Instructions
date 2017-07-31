import { Component, OnDestroy } from '@angular/core';
import { Http, Headers, Response, Request, RequestOptions, RequestMethod  } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { CloudinaryOptions, CloudinaryUploader, CloudinaryImageComponent } from 'ng2-cloudinary';
import { Subscription } from 'rxjs/Subscription';
import { RestService } from "./../RestService/RestService";

@Component({
    selector: 'profile',
    templateUrl: '/partial/profileComponent',
    providers: [RestService],
})

export class ProfileComponent {

    private id: number;
    private subscription: Subscription;
    public user: UserProfile;


    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({ cloudName: 'dr4opxk5i', uploadPreset: 'ajvv2x7e' })
    );

    constructor(private http: Http, private activateRoute: ActivatedRoute, private service: RestService) {
        this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
        console.log(this.id);
        service.getUserById(this.id.toString()).subscribe(result => {
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
