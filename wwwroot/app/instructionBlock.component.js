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
var router_1 = require("@angular/router");
var RestService_1 = require("./RestService/RestService");
var core_2 = require("@angular/core");
var angular_l10n_1 = require("angular-l10n");
var InstructionBlockComponent = (function () {
    function InstructionBlockComponent(http, activateRoute, service) {
        this.http = http;
        this.activateRoute = activateRoute;
        this.service = service;
        this.instructions = new Array();
        this.defaultGetInstruction = "10";
        this.defaultSkipInstruction = "0";
        this.fromProfileComponent = false;
        this.get = 8;
        this.stopRequest = true;
    }
    InstructionBlockComponent.prototype.selectRequest = function () {
        var _this = this;
        if (this.stopRequest) {
            this.stopRequest = false;
            this.service.getInstructionByUser(this.idUser.toString(), this.instructions.length.toString(), this.get.toString()).subscribe(function (result) {
                _this.instructions = _this.instructions.concat(result.json());
                _this.stopRequest = true;
            });
        }
    };
    InstructionBlockComponent.prototype.getHomePageRequest = function () {
        var _this = this;
        if (this.stopRequest) {
            this.stopRequest = false;
            this.service.getInstructions(this.property, this.type, this.value, this.defaultGetInstruction, this.defaultSkipInstruction).subscribe(function (result) {
                _this.instructions = result.json();
                _this.stopRequest = true;
            });
        }
    };
    InstructionBlockComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log("IBlock");
        console.log(this.idUser);
        console.log(this.fromProfileComponent);
        if (this.fromProfileComponent) {
            this.selectRequest();
        }
        else {
            this.subscription = this.activateRoute.params.subscribe(function (params) {
                _this.type = params['type'];
                _this.property = params['property'];
                _this.value = params['value'];
                if (_this.property == null)
                    _this.property = "all";
                _this.getHomePageRequest();
            });
        }
    };
    InstructionBlockComponent.prototype.onScroll = function () {
        var _this = this;
        if (this.fromProfileComponent) {
            console.log(this.idUser);
            console.log(this.fromProfileComponent);
            console.log("fromProfile");
            this.selectRequest();
        }
        else {
            if (this.stopRequest) {
                this.stopRequest = false;
                this.service.getInstructions(this.property, this.type, this.value, this.defaultGetInstruction, this.instructions.length.toString()).subscribe(function (result) {
                    _this.instructions = _this.instructions.concat(result.json());
                    _this.stopRequest = true;
                });
            }
        }
    };
    return InstructionBlockComponent;
}());
__decorate([
    angular_l10n_1.Language(),
    __metadata("design:type", String)
], InstructionBlockComponent.prototype, "lang", void 0);
__decorate([
    core_2.Input(),
    __metadata("design:type", Number)
], InstructionBlockComponent.prototype, "idUser", void 0);
__decorate([
    core_2.Input(),
    __metadata("design:type", Boolean)
], InstructionBlockComponent.prototype, "fromProfileComponent", void 0);
InstructionBlockComponent = __decorate([
    core_1.Component({
        selector: 'instructionBlock',
        templateUrl: '/partial/instructionBlockComponent',
        providers: [RestService_1.RestService],
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.ActivatedRoute, RestService_1.RestService])
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