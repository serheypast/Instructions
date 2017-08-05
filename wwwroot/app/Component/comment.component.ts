import { Component, OnInit } from '@angular/core';
import { RestService } from "./../RestService/RestService";
import { Input } from '@angular/core';
@Component({
    selector: 'comments',
    templateUrl: '/partial/commentComponent',
    providers: [RestService],
})

export class CommentComponent {
    comments: Comment[] = [];
    yourComment: Comment = new Comment;
    @Input() userProfile: UserProfile;
    @Input() idInstruction: number;
    take: string = "10";
    skip: string;
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
        this.service.getCommentsByInstruction(this.take, this.comments.length.toString(), this.idInstruction.toString()).subscribe(result => {
            console.log("GetCommentresult= " + result.json());
            let arrComments = result.json();
            if (arrComments != null)
                this.comments = this.comments.concat(arrComments);
        });
    }

    deleteComment(i: number): void {
        //request in bd
        this.comments[i];
        this.comments.splice(i,1);
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