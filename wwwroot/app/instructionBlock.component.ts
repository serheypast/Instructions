import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'instructionBlock',
    templateUrl: '/partial/instructionBlockComponent'
})

export class InstructionBlockComponent {
    //instructions: Instruction[];
    instructions: Array<Instruction> = new Array<Instruction>();
    private defaultInstruction: string = "15";

    constructor(private http: Http) {
        http.get('/api/getInstruction/' + this.defaultInstruction + '/0').subscribe(result => {
            this.instructions = result.json();
        });

    }


    onScroll() {
        console.log(this.instructions.length.toString());
        this.http.get('/api/getInstruction/15/' + this.instructions.length.toString()).subscribe(result => {
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