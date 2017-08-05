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
var router_1 = require("@angular/router");
var DisplayInstructionComponent = (function () {
    function DisplayInstructionComponent(service, activateRoute) {
        var _this = this;
        this.service = service;
        this.activateRoute = activateRoute;
        this.instruction = new Instruction();
        this.loadInfo = false;
        this.loadTag = false;
        this.loadUser = false;
        this.loadInfo = false;
        this.loadUser = false;
        this.subscription = this.activateRoute.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.service.getInstrcutionById(this.id).subscribe(function (result) {
            _this.instruction = result.json();
            console.log(_this.instruction);
            _this.beginRating = _this.instruction.rating;
            if (_this.instruction.tags.length == 0) {
                var tagInst = new InstructionTag();
                var tag1 = new Tag();
                tag1.name = "";
                tagInst.tag = tag1;
                _this.instruction.tags.push(tagInst);
            }
            _this.service.getCurrentUser().subscribe(function (result) {
                _this.currentUser = result.json();
                _this.service.UserLikeIt(_this.currentUser.id.toString(), _this.instruction.id.toString()).subscribe(function (result) {
                    _this.like = result.json();
                });
                if (_this.currentUser != null)
                    _this.loadUser = true;
            });
            console.log("LoadInfo");
            _this.loadInfo = true;
        });
    }
    DisplayInstructionComponent.prototype.ngOnInit = function () {
    };
    DisplayInstructionComponent.prototype.putLike = function () {
        console.log(this.like);
        if (this.like) {
            this.instruction.rating -= 1;
        }
        else {
            this.instruction.rating += 1;
        }
        this.like = !this.like;
        //request on server
    };
    DisplayInstructionComponent.prototype.ngOnDestroy = function () {
        var oldRating = this.instruction.rating;
        this.instruction.rating = oldRating - this.beginRating;
        this.service.changeRatingInstruction(this.instruction);
        this.instruction.rating = oldRating;
    };
    return DisplayInstructionComponent;
}());
DisplayInstructionComponent = __decorate([
    core_1.Component({
        selector: 'display-instructions',
        templateUrl: '/partial/displayInstructionComponent',
        providers: [RestService_1.RestService]
    }),
    __metadata("design:paramtypes", [RestService_1.RestService, router_1.ActivatedRoute])
], DisplayInstructionComponent);
exports.DisplayInstructionComponent = DisplayInstructionComponent;
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
var UserProfile = (function () {
    function UserProfile() {
    }
    return UserProfile;
}());
//# sourceMappingURL=displayInstruction.component.js.map