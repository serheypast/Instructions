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
        var instr = new Instruction();
        var step1 = new Step();
        var step2 = new Step();
        step1.name = "FirstStep";
        step2.name = "SecondStep";
        var bl1 = new Block();
        var bl2 = new Block();
        bl1.type = "1";
        bl1.field = "1 1";
        bl2.type = "1";
        bl2.field = "1 2";
        var bl12 = new Block();
        var bl22 = new Block();
        bl12.type = "1";
        bl12.field = "2 1";
        bl22.type = "1";
        bl22.field = "2 2";
        step1.blocks = step1.blocks.concat(bl1, bl2);
        step2.blocks = step2.blocks.concat(bl12, bl22);
        instr.steps = instr.steps.concat(step1, step2);
        instr.name = "FirstName";
        var tag = new Tag();
        tag.name = "One";
        var tag1 = new Tag();
        tag1.name = "Two";
        var tag2 = new Tag();
        tag2.name = "Three";
        var tagInst = new InstructionTag();
        tagInst.tag = tag;
        var tagInst1 = new InstructionTag();
        tagInst1.tag = tag1;
        var tagInst2 = new InstructionTag();
        tagInst2.tag = tag2;
        instr.tags = instr.tags.concat(tagInst, tagInst1, tagInst2);
        var category = new Category();
        category.name = "pussy";
        instr.category = category;
        console.log("publishINst");
        console.log(instr);
        //let body = JSON.stringify(instruction);
        this.http.post("api/publishInstruction", instr)
            .subscribe(function (result) {
            console.log(result.json());
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
var UserProfile = (function () {
    function UserProfile() {
    }
    return UserProfile;
}());
var Block = (function () {
    function Block() {
    }
    return Block;
}());
var Step = (function () {
    function Step() {
        this.blocks = [];
    }
    return Step;
}());
var Instruction = (function () {
    function Instruction() {
        this.tags = [];
        this.steps = [];
    }
    return Instruction;
}());
var Category = (function () {
    function Category() {
    }
    return Category;
}());
var InstructionTag = (function () {
    function InstructionTag() {
    }
    return InstructionTag;
}());
var Tag = (function () {
    function Tag() {
        this.instructoins = [];
    }
    return Tag;
}());
var Block1 = (function () {
    function Block1() {
    }
    return Block1;
}());
var Step1 = (function () {
    function Step1() {
        this.blocks = [];
    }
    return Step1;
}());
var Instruction1 = (function () {
    function Instruction1() {
        this.tags = [];
        this.steps = [];
    }
    return Instruction1;
}());
//# sourceMappingURL=RestService.js.map