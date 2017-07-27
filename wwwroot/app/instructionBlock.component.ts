import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'instructionBlock',
    templateUrl: '/partial/instructionBlockComponent'
})

export class InstructionBlockComponent {
    //instructions: Instruction[];
    instructions: Array<Instruction> = new Array<Instruction>();


    constructor(private http: Http) {
        http.get('/api/api/getInstruction/15/0').subscribe(result => {
            this.instructions = result.json();
        });

    }


    onScroll() {
        console.log(this.instructions.length.toString());
        this.http.get('/api/api/getInstruction/15/' + this.instructions.length.toString()).subscribe(result => {
            this.instructions = this.instructions.concat(result.json());
        });
    }
}

class Instruction {
    authorId: string;
    category: string;
    dataCreated: string;
    id: number;
    name: string;
    previewImageUrl: string;
    rating: number;

}
