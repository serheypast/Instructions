import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'profile',
    templateUrl: '/partial/profileComponent'
})

export class ProfileComponent {
    public user: UserProfile;
    constructor(http: Http) {
        http.get('/api/api/city/').subscribe(result => {
            this.user = result.json();
            console.log(this.user);
        });
    }

    firstName: boolean = true;
    change(): void {
        console.log(this.firstName)
        this.firstName = !this.firstName;
    }
}

interface UserProfile{
    firstName: string;
    secondName: string;
    urlPhoto: string;
    rating: number;
    country: string;
    city: string;
    dataOfBirth: string;
    aboutMySelf: string;
  
}