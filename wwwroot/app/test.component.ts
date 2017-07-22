import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'test',
    templateUrl: '/partial/testComponent'
})

export class TestComponent {
    public user: UserProfile;
    constructor(http: Http) {
        http.get('/api/api/city/').subscribe(result => {
         
            this.user = result.json();
            console.log(this.user);
        });
    }
}

interface UserProfile {

    firstName: string;
    rating: number;
}