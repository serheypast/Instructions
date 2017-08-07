import { Component, OnInit,OnDestroy } from '@angular/core';
import { Language } from 'angular-l10n';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { RestService } from "./../RestService/RestService";
import { RoleService } from "./../RoleService/RoleService";
@Component({
    selector: 'display-instructions',
    templateUrl: '/partial/displayInstructionComponent',
    styleUrls: ['./css/Components/displayInstructionComponent.css'],
    providers: [RestService, RoleService]
})

export class DisplayInstructionComponent {
    @Language() lang: string;
    instruction: Instruction = new Instruction();
    currentUser: UserProfile;
    public id: number;
    private subscription: Subscription;
    public userProfileId: string;
    public firstName: string;
    public categoryName: string;
    loadInfo: boolean = false;
    loadTag: boolean = false;
    loadUser: boolean = false;
    beginRating: number;
    AuthUser: AuthUser;

    public checkRole(): boolean {
        this.AuthUser = RoleService.getCurrentAuthUser();      
        return (this.AuthUser.role == 'Admin' || this.AuthUser.id == this.instruction.userProfile.id);
    }

    public removeInstruction() {
        console.log("remove");
        console.log("remove" + this.instruction);
        this.service.removeInstruction(this.instruction);
    }

    constructor(private service: RestService, private activateRoute: ActivatedRoute, ) {
        this.loadInfo = false;
        this.subscription = this.activateRoute.params.subscribe(params => {
            this.id = params['id'];
        });
        this.service.getInstrcutionById(this.id).subscribe(result => {
            this.instruction = result.json();
            if (this.instruction.tags.length == 0) {
                let tagInst = new InstructionTag();
                let tag1 = new Tag();
                tag1.name = "";
                tagInst.tag = tag1;
                this.instruction.tags.push(tagInst);
            }
            let userId = RoleService.getCurrentAuthUser().id;
            if (userId == -1) {
                this.currentUser = new UserProfile();
                this.currentUser.id = -1;
                this.loadComment = true;
            } else {
                this.service.getUserById(userId.toString()).subscribe(result => {
                    this.loadComment = true;
                    this.currentUser = result.json();
                    this.service.UserLikeIt(this.currentUser.id.toString(), this.instruction.id.toString()).subscribe(result => {
                        this.like = result.json();
                    });
                });
            }

            this.loadInfo = true;
        });
    
    }
    loadComment: boolean = false;
    ngOnInit() {
      
       
    }

    like: boolean;
    likeChanged: number = 0;
    putLike() {
        if (RoleService.getCurrentAuthUser().role != 'Guest') {
            if (this.like) {
                this.instruction.rating -= 1;
                this.likeChanged = -1;
            }
            else {
                this.instruction.rating += 1;
                this.likeChanged = 1;
            }
            this.like = !this.like;
        }
        else {
            //input Info about sign in
        }
    }

    editInstruction() {
        console.log(this.instruction);
    }

    ngOnDestroy() {
        if (this.likeChanged != 0)
        this.service.changeRatingInstruction(this.instruction);
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

class AuthUser {
    id: number = 0;
    role: string;
}