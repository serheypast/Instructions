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
var ng2_cloudinary_1 = require("ng2-cloudinary");
var RestService_1 = require("./../RestService/RestService");
var RoleService_1 = require("./../RoleService/RoleService");
var angular_l10n_1 = require("angular-l10n");
var ProfileComponent = (function () {
    function ProfileComponent(http, activateRoute, service) {
        var _this = this;
        this.http = http;
        this.activateRoute = activateRoute;
        this.service = service;
        this.instructionBool = true;
        this.uploader = new ng2_cloudinary_1.CloudinaryUploader(new ng2_cloudinary_1.CloudinaryOptions({ cloudName: 'dr4opxk5i', uploadPreset: 'ajvv2x7e' }));
        this.changeField = true;
        this.subscription = activateRoute.params.subscribe(function (params) { return _this.id = params['id']; });
        console.log(this.id);
        service.getUserById(this.id.toString()).subscribe(function (result) {
            _this.user = result.json();
            if (_this.user.urlPhoto == null)
                _this.user.urlPhoto = "https://res.cloudinary.com/dr4opxk5i/image/upload/j8khmafnd7hbxwpxy0kb.jpg";
            console.log(_this.user);
            console.log(_this.user.achivments);
            console.log("GetUserById");
            _this.achivments = _this.user.achivments;
        });
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            var res = JSON.parse(response);
            _this.user.urlPhoto = "https://res.cloudinary.com/dr4opxk5i/image/upload/" + res.public_id + ".jpg";
            return { item: item, response: response, status: status, headers: headers };
        };
    }
    ProfileComponent.prototype.checkRole = function () {
        console.log("CheckRole");
        this.AuthUser = RoleService_1.RoleService.getCurrentAuthUser();
        console.log("AuthUser = " + this.AuthUser.id.toString() + "/" + this.AuthUser.role);
        return (this.AuthUser.role == 'Admin' || this.AuthUser.id == this.user.id) ? true : false;
    };
    ProfileComponent.prototype.isAdmin = function () {
        return (RoleService_1.RoleService.getCurrentAuthUser().role == 'Admin') ? true : false;
    };
    ProfileComponent.prototype.onChange = function (event) {
        this.uploader.uploadAll();
    };
    ProfileComponent.prototype.change = function () {
        this.changeField = !this.changeField;
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
        console.log(this.user);
        this.service.editProfile(this.user);
    };
    return ProfileComponent;
}());
__decorate([
    angular_l10n_1.Language(),
    __metadata("design:type", String)
], ProfileComponent.prototype, "lang", void 0);
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        templateUrl: '/partial/profileComponent',
        styleUrls: ['./css/Components/profileComponent.css'],
        providers: [RestService_1.RestService, RoleService_1.RoleService],
    }),
    __metadata("design:paramtypes", [http_1.Http, router_1.ActivatedRoute, RestService_1.RestService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
var UserProfile = (function () {
    function UserProfile() {
    }
    return UserProfile;
}());
var Achivment = (function () {
    function Achivment() {
    }
    return Achivment;
}());
var AchivmentUser = (function () {
    function AchivmentUser() {
    }
    return AchivmentUser;
}());
var AuthUser = (function () {
    function AuthUser() {
        this.id = 0;
    }
    return AuthUser;
}());
//# sourceMappingURL=profile.component.js.map