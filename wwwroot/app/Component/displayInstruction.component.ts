import { Component, OnInit,OnDestroy } from '@angular/core';
import { Language } from 'angular-l10n';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { RestService } from "./../RestService/RestService";


@Component({
    selector: 'display-instructions',
    templateUrl: '/partial/displayInstructionComponent',
    providers: [RestService]
})

export class DisplayInstructionComponent {
    @Language() lang: string;
    instruction: Instruction = new Instruction();
    currentUser: UserProfile;
    public id: string;
    private subscription: Subscription;
    public userProfileId: string;
    public firstName: string;
    public categoryName: string;
    loadInfo: boolean = false;
    loadTag: boolean = false;
    loadUser: boolean = false;
    beginRating: number;
    constructor(private service: RestService, private activateRoute: ActivatedRoute, ) {
        this.loadInfo = false;
        this.loadUser = false;
        this.subscription = this.activateRoute.params.subscribe(params => {
            this.id = params['id'];
        });
        this.service.getInstrcutionById(this.id).subscribe(result => {
            this.instruction = result.json();
            this.beginRating = this.instruction.rating;
            if (this.instruction.tags.length == 0) {
                let tagInst = new InstructionTag();
                let tag1 = new Tag();
                tag1.name = "";
                tagInst.tag = tag1;
                this.instruction.tags.push(tagInst);
            }
            this.service.getCurrentUser().subscribe(result => {
                this.currentUser = result.json();            
                this.service.UserLikeIt(this.currentUser.id.toString(), this.instruction.id.toString()).subscribe(result => {
                    this.like = result.json();
                });
                if (this.currentUser != null)
                    this.loadUser = true;                          
            });
            console.log("LoadInfo");

            this.loadInfo = true;
        });
       
      
    
    }

    ngOnInit() {
      
       
    }

    like: boolean;

    putLike() {
        console.log(this.like);
        if (this.like) {
            this.instruction.rating -= 1;
        }
        else {
            this.instruction.rating += 1;
        }

        this.like = !this.like;
        //request on server
    }

    ngOnDestroy() {
        let oldRating: number = this.instruction.rating;
        this.instruction.rating = oldRating - this.beginRating;
        this.service.changeRatingInstruction(this.instruction);
        this.instruction.rating = oldRating;
    }

}

class Block {
    id: number;
    type: string;
    field: string;
    state: boolean;
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
    userProfile: UserProfile;
    tags: InstructionTag[] = [];
    steps: Step[] = [];
}

class Category {
    id: number;
    name: string;
}

class InstructionTag {
    id: number;
    tag: Tag;
    instruction: Instruction;
}

class Tag {
    id: number;
    name: string;
    instructoins: InstructionTag[] = [];
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

