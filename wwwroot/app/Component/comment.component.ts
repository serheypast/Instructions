import { Component, OnInit } from '@angular/core';
import { RestService } from "./../RestService/RestService";
import { RoleService } from "./../RoleService/RoleService";
import { Input } from '@angular/core';
@Component({
    selector: 'comments',
    templateUrl: '/partial/commentComponent',
    styleUrls: ['./css/Components/commentComponent.css'],
    providers: [RestService, RoleService],
})

export class CommentComponent {
    comments: Comment[] = [];
    yourComment: Comment = new Comment;
    @Input() userProfile: UserProfile;
    @Input() idInstruction: number;
    take: string = "10";
    skip: string;
    AuthUser: AuthUser;
    public checkRole(): boolean {
        this.AuthUser = RoleService.getCurrentAuthUser();
        return (this.AuthUser.role == 'Admin' || (this.AuthUser.id == this.userProfile.id && this.AuthUser.role != 'Guest')) ? true : false;
    }

    public checkRoleForDeleteComment(i:number): boolean {
        this.AuthUser = RoleService.getCurrentAuthUser();
        return (this.AuthUser.role == 'Admin' || this.AuthUser.id == this.comments[i].userProfile.id) ? true : false;
    }

    constructor(private service: RestService) {
        
    }

    ngOnInit() {          
        console.log("NgOnInitComment");
        console.log(this.idInstruction);
        this.getCommentsFromServer();
      //get comments from server      
    }

    addComment() {
        this.yourComment.dataCreated = Date.now();
        let comment = this.createComment();
        this.comments.push(comment);      
        this.sendCommentOnServer(comment);
    }

    createComment(): Comment {
        let comment = new Comment();
        comment.dataCreated = Date.now();
        comment.userProfile = this.userProfile;
        comment.content = this.yourComment.content;
        comment.instruction = new Instruction();
        comment.instruction.id = this.idInstruction;
        this.yourComment.content = "";
        return comment;
    }

    sendCommentOnServer(comment: Comment) {
        console.log(comment);
        this.service.sendCommentsOnServer(comment);
    }

    getCommentsFromServer() {
        console.log("getCommentsFromServer");
        console.log(this.idInstruction.toString());
        if (this.stopRequest) {
            this.stopRequest = false;
            this.service.getCommentsByInstruction(this.take, this.comments.length.toString(), this.idInstruction.toString()).subscribe(result => {
                this.stopRequest = true;
                console.log("GetCommentresult= " + result.json());
                let arrComments = result.json();
                if (arrComments != null)
                    this.comments = this.comments.concat(arrComments);
            });
        }
      
    }

    deleteComment(i: number): void {
        //request in bd
        let comment = this.comments[i];
        this.service.removeCommentOnInstrucion(comment);
        this.comments.splice(i, 1);
        
       
    }

    stopRequest: boolean = true;
    onScroll() {
        this.getCommentsFromServer();
    }
}

class Comment {
    id: number;
    dataCreated: number;
    userProfile: UserProfile;
    instruction: Instruction;
    content: string;
}

class UserProfile {
    id: number;
    firstName: string;
    secondName: string = "";
    urlPhoto: string;
    rating: number;
    country: string;
    city: string;
    dataOfBirth: string;
    aboutMySelf: string;
}
class Instruction {
    id: number;
}
class AuthUser {
    id: number = 0;
    role: string;
}
