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

    public editInstruction(instruction: any) {
        this.http.post("api/editInstruction", instruction)
            .subscribe(result => {
                console.log("after editing");
                console.log(result.json());
            });
    } 

    public getInstructions(property: string, type: string, value: string , take: string, skip: string) {
        return this.http.get('/api/getInstructions/' + take + '/' + skip + '/' + property + '/' + type + '/' + value);
    }

    public getCategories() {
        return this.http.get('/api/getAllCategories');
    }

    public getTags() {
        return this.http.get('api/getTags');
    }

    public getInstrcutionById(id: number) {
        return this.http.get('api/getInstrcutionById/' + id);
    }

    public UserLikeIt(idUser: string, idInstruction: string) {
        console.log("userLikeIt" + idUser + "/" + idInstruction);
        return this.http.get('api/isUserLikedIt/' + idUser + '/' + idInstruction );
    }

    public changeRatingInstruction(value: any) {
        console.log("change");
        this.http.post('api/changeRatingInstruction/', value).subscribe(result => {
            console.log(result.json());
        });
    }

    public getCurrentUser() {
        return this.http.get('api/getCurrentUser/');
    }

    public getCommentsByInstruction(take: string, skip: string, idInstruction: string) {
        return this.http.get('api/getCommentsByInstruction' + '/' + idInstruction + '/' + skip + '/' + take);
    }

    public sendCommentsOnServer(commentary: any) {
        this.http.post('api/addCommentOnInstruction/', commentary).subscribe(result => {
            console.log("hey");
        });
    }

    public getInstructionByUser(idUser: string, skip: string, get: string) {
        return this.http.get('api/getUserInstruction/' + idUser + '/' + get + '/' + skip);
    }

    public removeCommentOnInstrucion(commentary: any) {
        return this.http.post('api/removeCommentOnInstruction/', commentary).subscribe(result => {
            console.log("commend is delete");
        });
    }


    public removeInstruction(idInstriction: any) {
        this.http.post("api/removeInstructionById", idInstriction)
            .subscribe(result => {
                
            });
    } 

}
