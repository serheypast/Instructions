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
require("rxjs/Rx");
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var http_1 = require("@angular/http");
var RestService = (function () {
    function RestService(http) {
        this.http = http;
    }
    RestService.prototype.getUserById = function (id) {
        return this.http.get('api/getUserById/' + id);
    };
    RestService.prototype.editProfile = function (user) {
        console.log("UserServiceRest");
        console.log(user);
        this.http.post("api/editProfile", user).subscribe(function (result) {
            console.log(result.json());
        });
    };
    RestService.prototype.publishInstruction = function (instruction) {
        this.http.post("api/publishInstruction", instruction)
            .subscribe(function (result) {
            console.log(result.json());
        });
    };
    RestService.prototype.editInstruction = function (instruction) {
        this.http.post("api/editInstruction", instruction)
            .subscribe(function (result) {
            console.log("after editing");
            console.log(result.json());
        });
    };
    RestService.prototype.getInstructions = function (property, type, value, take, skip) {
        return this.http.get('/api/getInstructions/' + take + '/' + skip + '/' + property + '/' + type + '/' + value);
    };
    RestService.prototype.getCategories = function () {
        return this.http.get('/api/getAllCategories');
    };
    RestService.prototype.getTags = function () {
        return this.http.get('api/getTags');
    };
    RestService.prototype.getInstrcutionById = function (id) {
        return this.http.get('api/getInstrcutionById/' + id);
    };
    RestService.prototype.UserLikeIt = function (idUser, idInstruction) {
        console.log("userLikeIt" + idUser + "/" + idInstruction);
        return this.http.get('api/isUserLikedIt/' + idUser + '/' + idInstruction);
    };
    RestService.prototype.changeRatingInstruction = function (value) {
        console.log("change");
        this.http.post('api/changeRatingInstruction/', value).subscribe(function (result) {
            console.log(result.json());
        });
    };
    RestService.prototype.getCurrentUser = function () {
        return this.http.get('api/getCurrentUser/');
    };
    RestService.prototype.getCommentsByInstruction = function (take, skip, idInstruction) {
        return this.http.get('api/getCommentsByInstruction' + '/' + idInstruction + '/' + skip + '/' + take);
    };
    RestService.prototype.sendCommentsOnServer = function (commentary) {
        this.http.post('api/addCommentOnInstruction/', commentary).subscribe(function (result) {
            console.log("hey");
        });
    };
    RestService.prototype.getInstructionByUser = function (idUser, skip, get) {
        return this.http.get('api/getUserInstruction/' + idUser + '/' + get + '/' + skip);
    };
    RestService.prototype.removeCommentOnInstrucion = function (commentary) {
        return this.http.post('api/removeCommentOnInstruction/', commentary).subscribe(function (result) {
            console.log("commend is delete");
        });
    };
    RestService.prototype.removeInstruction = function (idInstriction) {
        this.http.post("api/removeInstructionById", idInstriction)
            .subscribe(function (result) {
        });
    };
    return RestService;
}());
RestService = __decorate([
    core_2.Component({}),
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RestService);
exports.RestService = RestService;
//# sourceMappingURL=RestService.js.map