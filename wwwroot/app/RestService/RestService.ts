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

    public publishInstruction(instruction: Instruction1) {
        let instr = new Instruction();
        let step1 = new Step();
        let step2 = new Step();

        step1.name = "FirstStep";
        step2.name = "SecondStep";

        let bl1 = new Block();
        let bl2 = new Block();
        bl1.type = "1";
        bl1.field = "1 1";
        bl2.type = "1";
        bl2.field = "1 2";

        let bl12 = new Block();
        let bl22 = new Block();
        bl12.type = "1";
        bl12.field = "2 1";
        bl22.type = "1";
        bl22.field = "2 2";

        step1.blocks = step1.blocks.concat(bl1, bl2);
        step2.blocks = step2.blocks.concat(bl12, bl22);
        instr.steps = instr.steps.concat(step1, step2);
        instr.name = "FirstName";
        let tag = new Tag();
        tag.name = "One";
        let tag1 = new Tag();
        tag1.name = "Two";
        let tag2 = new Tag();
        tag2.name = "Three";
        let tagInst = new InstructionTag();
        tagInst.tag = tag;
        let tagInst1 = new InstructionTag();
        tagInst1.tag = tag1;
        let tagInst2 = new InstructionTag();
        tagInst2.tag = tag2;
        instr.tags = instr.tags.concat(tagInst, tagInst1, tagInst2);
        let category = new Category();
        category.name = "pussy";
        instr.category = category;

        console.log("publishINst");
        console.log(instr);
        
        //let body = JSON.stringify(instruction);

        this.http.post("api/publishInstruction", instr)
            .subscribe(result => {
                console.log(result.json());
            });
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

class Block {
    id: number;
    type: string;
    field: string;
}

class Step {
    id: number;
    position: number;
    name: string;
    blocks: Block[] = [];
}

class Instruction {
    id: number;
    name: string;
    dataCreated: string;
    previewImageUrl: string;
    rating: number;
    category: Category; 
    userProfile: null;
    tags: InstructionTag[] = [];
    steps: Step[] = [];
    
}

class Category{
    id: number;
    name: string;
}

class InstructionTag{
    id: number;
    tag: Tag;
    instruction: Instruction;
}

class Tag {
    id: number;
    name: string;
    instructoins: InstructionTag[] = [];
}


class Block1 {
    type: string;
    field: string;
    state: boolean;
}

class Step1 {
    name: string;
    blocks: Block1[] = [];
}

class Instruction1 {
    instructionName: string;
    mainImageUrl: string;
    category: string;
    tags: string[] = [];
    steps: Step1[] = [];

}