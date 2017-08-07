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
var angular_l10n_1 = require("angular-l10n");
var router_1 = require("@angular/router");
var RestService_1 = require("./../RestService/RestService");
var RoleService_1 = require("./../RoleService/RoleService");
var DisplayInstructionComponent = (function () {
    function DisplayInstructionComponent(service, activateRoute) {
        var _this = this;
        this.service = service;
        this.activateRoute = activateRoute;
        this.instruction = new Instruction();
        this.loadInfo = false;
        this.loadTag = false;
        this.loadUser = false;
        this.loadComment = false;
        this.likeChanged = 0;
        this.loadInfo = false;
        this.subscription = this.activateRoute.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.service.getInstrcutionById(this.id).subscribe(function (result) {
            _this.instruction = result.json();
            if (_this.instruction.tags.length == 0) {
                var tagInst = new InstructionTag();
                var tag1 = new Tag();
                tag1.name = "";
                tagInst.tag = tag1;
                _this.instruction.tags.push(tagInst);
            }
            var userId = RoleService_1.RoleService.getCurrentAuthUser().id;
            if (userId == -1) {
                _this.currentUser = new UserProfile();
                _this.currentUser.id = -1;
                _this.loadComment = true;
            }
            else {
                _this.service.getUserById(userId.toString()).subscribe(function (result) {
                    _this.loadComment = true;
                    _this.currentUser = result.json();
                    _this.service.UserLikeIt(_this.currentUser.id.toString(), _this.instruction.id.toString()).subscribe(function (result) {
                        _this.like = result.json();
                    });
                });
            }
            _this.loadInfo = true;
        });
    }
    DisplayInstructionComponent.prototype.checkRole = function () {
        this.AuthUser = RoleService_1.RoleService.getCurrentAuthUser();
        return (this.AuthUser.role == 'Admin' || this.AuthUser.id == this.instruction.userProfile.id);
    };
    DisplayInstructionComponent.prototype.removeInstruction = function () {
        console.log("remove");
        console.log("remove" + this.instruction);
        this.service.removeInstruction(this.instruction);
    };
    DisplayInstructionComponent.prototype.ngOnInit = function () {
    };
    DisplayInstructionComponent.prototype.putLike = function () {
        if (RoleService_1.RoleService.getCurrentAuthUser().role != 'Guest') {
            if (this.like) {
                this.instruction.rating -= 1;
                this.likeChanged = -1;
            }
            else {
                this.instruction.rating += 1;
                this.likeChanged = 1;
            }
            this.like = !this.like;
        }
        else {
            //input Info about sign in
        }
    };
    DisplayInstructionComponent.prototype.editInstruction = function () {
        console.log(this.instruction);
    };
    DisplayInstructionComponent.prototype.ngOnDestroy = function () {
        if (this.likeChanged != 0)
            this.service.changeRatingInstruction(this.instruction);
    };
    return DisplayInstructionComponent;
}());
__decorate([
    angular_l10n_1.Language(),
    __metadata("design:type", String)
], DisplayInstructionComponent.prototype, "lang", void 0);
DisplayInstructionComponent = __decorate([
    core_1.Component({
        selector: 'display-instructions',
        templateUrl: '/partial/displayInstructionComponent',
        styleUrls: ['./css/Components/displayInstructionComponent.css'],
        providers: [RestService_1.RestService, RoleService_1.RoleService]
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
var AuthUser = (function () {
    function AuthUser() {
        this.id = 0;
    }
    return AuthUser;
}());
//# sourceMappingURL=displayInstruction.component.js.map