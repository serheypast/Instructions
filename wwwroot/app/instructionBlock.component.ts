import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { RestService } from "./RestService/RestService";

@Component({
    selector: 'instructionBlock',
    templateUrl: '/partial/instructionBlockComponent',
    providers: [RestService],
})

export class InstructionBlockComponent {
    //instructions: Instruction[];
    instructions: Array<Instruction> = new Array<Instruction>();
    private defaultInstruction: string = "15";
    public value: string;
    public type: string;
    public property: string;
    private subscription: Subscription;

    constructor(private http: Http, private activateRoute: ActivatedRoute, private service: RestService) {

        this.subscription = activateRoute.params.subscribe(params => {
            this.type = params['type'];
            this.property = params['property'];
            this.value = params['value'];
            if (this.property == null)
                this.property = "all";
            service.getInstructions(this.property , this.type, this.value, this.defaultInstruction, '0').subscribe(result => {
                this.instructions = result.json();
            });
        });       
        console.log(this.instructions);
        console.log(this.type);
        console.log(this.value);
    }

    private selectRequest() {
     
    }

    stopRequest: boolean = true;
    onScroll() {
        if (this.stopRequest)
        this.service.getInstructions(this.property, this.type, this.value, this.defaultInstruction, this.instructions.length.toString()).subscribe(result => {
            this.instructions = this.instructions.concat(result.json());
        });
    }
}


class Instruction {
    id: number;
    name: string;
    dataCreated: string;
    previewImageUrl: string;
    rating: number;
    category: Category;
    userProfile: UserProfile;
}

class Category {
    id: number;
    name: string;
}

class UserProfile {
    id: number;
    firstName: string;
    secondName: string;
    urlPhoto: string;
    rating: number;
    country: string;
    city: string;
    dataOfBirth: string;
    aboutMySelf: string;
}