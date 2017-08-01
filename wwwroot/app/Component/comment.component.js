"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CommentComponent = (function () {
    function CommentComponent() {
        this.comments = [];
        this.yourComment = new Comment;
    }
    CommentComponent.prototype.ngOnInit = function () {
        this.yourComment.personName = "Vlad";
        this.yourComment.urlPhoto = "http://crosti.ru/patterns/00/02/5e/08cc8338d5/picture.jpg";
        //get comments from server      
    };
    CommentComponent.prototype.addComment = function () {
        this.yourComment.date = Date.now();
        var comment = this.createComment();
        this.comments.push(comment);
        this.sendCommentOnServer();
    };
    CommentComponent.prototype.createComment = function () {
        var comment = new Comment();
        comment.date = Date.now();
        comment.urlPhoto = this.yourComment.urlPhoto;
        comment.personName = this.yourComment.personName;
        comment.content = this.yourComment.content;
        comment.like = 0;
        this.yourComment.content = "";
        return comment;
    };
    CommentComponent.prototype.sendCommentOnServer = function () {
    };
    CommentComponent.prototype.putLike = function (index) {
        //send on server and if true +1 else -1 like
        this.comments[index].like += 1;
    };
    return CommentComponent;
}());
CommentComponent = __decorate([
    core_1.Component({
        selector: 'comments',
        templateUrl: '/partial/commentComponent'
    }),
    __metadata("design:paramtypes", [])
], CommentComponent);
exports.CommentComponent = CommentComponent;
var Comment = (function () {
    function Comment() {
    }
    return Comment;
}());
//# sourceMappingURL=comment.component.js.map