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

    public editProfile(user: any) {
        console.log("UserServiceRest");
        console.log(user);
        this.http.post("api/editProfile", user).subscribe(result => {
            console.log(result.json());
        });
    }

    public publishInstruction(instruction: any) {
        this.http.post("api/publishInstruction", instruction)
            .subscribe(result => {
                console.log(result.json());
            });
    } 

    public getInstructions(property: string, type: string, value: string , take: string, skip: string) {
        console.log(property + " $type$  " + type + " $value$  " + value);
        return this.http.get('/api/getInstructions/' + take + '/' + skip + '/' + property + '/' + type + '/' + value);
    }

    public getCategories() {
        return this.http.get('/api/getAllCategories');
    }

    public getTags() {
        return this.http.get('api/getTags');
    }
}
