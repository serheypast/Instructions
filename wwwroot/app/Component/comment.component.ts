import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'comments',
    templateUrl: '/partial/commentComponent'
})

export class CommentComponent {
    comments: Comment[] = [];
    yourComment: Comment = new Comment;

    constructor() {}

    ngOnInit() {          
      this.yourComment.personName = "Vlad";
      this.yourComment.urlPhoto = "http://crosti.ru/patterns/00/02/5e/08cc8338d5/picture.jpg";
      
      //get comments from server      
    }

    addComment() {
        this.yourComment.date = Date.now();
        let comment = this.createComment();
        this.comments.push(comment);      
        this.sendCommentOnServer();
    }

    createComment(): Comment {
        let comment = new Comment();
        comment.date = Date.now();
        comment.urlPhoto = this.yourComment.urlPhoto;
        comment.personName = this.yourComment.personName;
        comment.content = this.yourComment.content;
        comment.like = 0;
        this.yourComment.content = "";
        return comment;
    }

    sendCommentOnServer() {

    }

    putLike(index: number) {
        //send on server and if true +1 else -1 like
        this.comments[index].like += 1;
    }

}

class Comment {
    date: number;
    personName: string;
    urlPhoto: string;
    content: string;
    like: number;
}