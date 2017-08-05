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
var RestService_1 = require("./../RestService/RestService");
var core_2 = require("@angular/core");
var CommentComponent = (function () {
    function CommentComponent(service) {
        this.service = service;
        this.comments = [];
        this.yourComment = new Comment;
        this.take = "10";
    }
    CommentComponent.prototype.ngOnInit = function () {
        console.log("NgOnInitComment");
        console.log(this.idInstruction);
        this.getCommentsFromServer();
        //get comments from server      
    };
    CommentComponent.prototype.addComment = function () {
        this.yourComment.dataCreated = Date.now();
        var comment = this.createComment();
        this.comments.push(comment);
        this.sendCommentOnServer(comment);
    };
    CommentComponent.prototype.createComment = function () {
        var comment = new Comment();
        comment.dataCreated = Date.now();
        comment.userProfile = this.userProfile;
        comment.content = this.yourComment.content;
        comment.instruction = new Instruction();
        comment.instruction.id = this.idInstruction;
        this.yourComment.content = "";
        return comment;
    };
    CommentComponent.prototype.sendCommentOnServer = function (comment) {
        console.log(comment);
        this.service.sendCommentsOnServer(comment);
    };
    CommentComponent.prototype.getCommentsFromServer = function () {
        var _this = this;
        console.log("getCommentsFromServer");
        console.log(this.idInstruction.toString());
        this.service.getCommentsByInstruction(this.take, this.comments.length.toString(), this.idInstruction.toString()).subscribe(function (result) {
            console.log("GetCommentresult= " + result.json());
            var arrComments = result.json();
            if (arrComments != null)
                _this.comments = _this.comments.concat(arrComments);
        });
    };
    return CommentComponent;
}());
__decorate([
    core_2.Input(),
    __metadata("design:type", UserProfile)
], CommentComponent.prototype, "userProfile", void 0);
__decorate([
    core_2.Input(),
    __metadata("design:type", Number)
], CommentComponent.prototype, "idInstruction", void 0);
CommentComponent = __decorate([
    core_1.Component({
        selector: 'comments',
        templateUrl: '/partial/commentComponent',
        providers: [RestService_1.RestService],
    }),
    __metadata("design:paramtypes", [RestService_1.RestService])
], CommentComponent);
exports.CommentComponent = CommentComponent;
var Comment = (function () {
    function Comment() {
    }
    return Comment;
}());
var UserProfile = (function () {
    function UserProfile() {
        this.secondName = "";
    }
    return UserProfile;
}());
var Instruction = (function () {
    function Instruction() {
    }
    return Instruction;
}());
//# sourceMappingURL=comment.component.js.map