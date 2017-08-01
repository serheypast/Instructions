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
var http_1 = require("@angular/http");
var InstructionBlockComponent = (function () {
    function InstructionBlockComponent(http) {
        var _this = this;
        this.http = http;
        //instructions: Instruction[];
        this.instructions = new Array();
        this.defaultInstruction = "15";
        http.get('/api/getInstruction/' + this.defaultInstruction + '/0').subscribe(function (result) {
            _this.instructions = result.json();
        });
        console.log(this.instructions);
    }
    InstructionBlockComponent.prototype.onScroll = function () {
        var _this = this;
        console.log(this.instructions.length.toString());
        this.http.get('/api/getInstruction/15/' + this.instructions.length.toString()).subscribe(function (result) {
            _this.instructions = _this.instructions.concat(result.json());
        });
    };
    return InstructionBlockComponent;
}());
InstructionBlockComponent = __decorate([
    core_1.Component({
        selector: 'instructionBlock',
        templateUrl: '/partial/instructionBlockComponent'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], InstructionBlockComponent);
exports.InstructionBlockComponent = InstructionBlockComponent;
var Instruction = (function () {
    function Instruction() {
    }
    return Instruction;
}());
var Category = (function () {
    function Category() {
    }
    return Category;
}());
var UserProfile = (function () {
    function UserProfile() {
    }
    return UserProfile;
}());
//# sourceMappingURL=instructionBlock.component.js.map