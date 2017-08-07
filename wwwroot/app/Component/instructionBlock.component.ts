import { Component,OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { RestService } from "./../RestService/RestService";
import { Input } from '@angular/core';
import { Language } from 'angular-l10n';
import { RoleService } from "./../RoleService/RoleService";

@Component({
    selector: 'instructionBlock',
    templateUrl: '/partial/instructionBlockComponent',
    styleUrls: ['./css/Components/instructionBlockComponent.css'],
    providers: [RestService, RoleService],
})

export class InstructionBlockComponent {
    @Language() lang: string;
    instructions: Array<Instruction> = new Array<Instruction>();
    id: number;
    private defaultGetInstruction: string = "10";
    private defaultSkipInstruction: string = "0";
    public value: string;
    public type: string;
    public property: string;
    private subscription: Subscription;
    @Input() idUser: number;
    @Input() fromProfileComponent: boolean = false;
    private get: number = 8;
    likes:boolean [] = [];

    constructor(private http: Http, private activateRoute: ActivatedRoute, private service: RestService) {
        console.log("CheckRoleServiceInInstructionBlock");
        console.log(RoleService.getCurrentAuthUser());  
    }

    private selectRequest() {
        if (this.stopRequest) {
            this.stopRequest = false;
            this.service.getInstructionByUser(this.idUser.toString(), this.instructions.length.toString(), this.get.toString()).subscribe(result => {
                this.instructions = this.instructions.concat(result.json());
                this.stopRequest = true;
            });
        }
    }

    private setLikes() {
        this.likes = [];
        for (let instruction of this.instructions) {
            this.likes.push(false);
            for (let usersLike of instruction.usersLike) {
                if (usersLike.userProfile.id == this.id) {
                    this.likes.pop();
                    this.likes.push(true);
                }
            }
        }
    }

    private getHomePageRequest() {
        if (this.stopRequest) {
            this.stopRequest = false;
            this.service.getInstructions(this.property, this.type, this.value, this.defaultGetInstruction, this.defaultSkipInstruction).subscribe(result => {
                this.instructions = result.json();
                
                this.id = RoleService.getCurrentAuthUser().id;
                console.log("Userid:" + this.id);
                this.setLikes();
                this.stopRequest = true;
                console.log(this.instructions);
                console.log(this.idUser);
            });
        }
    }

    ngOnInit() {
        console.log("IBlock");
        console.log(this.idUser);
        console.log(this.fromProfileComponent);
        if (this.fromProfileComponent) {
            this.selectRequest();
        }
        else {
            this.subscription = this.activateRoute.params.subscribe(params => {
                this.type = params['type'];
                this.property = params['property'];
                this.value = params['value'];
                if (this.property == null)
                    this.property = "all";
                this.getHomePageRequest();
            });
        }
    }

    stopRequest: boolean = true;
    onScroll() {
        if (this.fromProfileComponent) {
            console.log(this.idUser);
            console.log(this.fromProfileComponent);
            console.log("fromProfile");
            this.selectRequest();
        } else {
            if (this.stopRequest) {
                this.stopRequest = false;
                this.service.getInstructions(this.property, this.type, this.value, this.defaultGetInstruction, this.instructions.length.toString()).subscribe(result => {
                    this.instructions = this.instructions.concat(result.json());
                    this.setLikes();
                    this.stopRequest = true;
                });
            }
        }
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
    usersLike: UserLike[] = [];
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
    usersLike: UserLike[] = [];
}

class UserLike {
    id: number;
    userProfile: UserProfile;
    instruction: Instruction;
}

class AuthUser {
    id: number;
    role: string;
}