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
var platform_browser_1 = require("@angular/platform-browser");
var RestService_1 = require("./RestService/RestService");
var router_1 = require("@angular/router");
var ng2_completer_1 = require("ng2-completer");
var angular_l10n_1 = require("angular-l10n");
var RoleService_1 = require("./RoleService/RoleService");
var AppComponent = (function () {
    function AppComponent(completerService, titleService, router, service) {
        var _this = this;
        this.completerService = completerService;
        this.titleService = titleService;
        this.router = router;
        this.service = service;
        this.angularClientSideData = 'Angular';
        this.user = new AuthUser();
        console.log("CheckRoleServiceInAppComponent");
        console.log(RoleService_1.RoleService.getCurrentAuthUser());
        this.service.getCurrentUser().subscribe(function (result) {
            _this.user = result.json();
            if (_this.user == null) {
                _this.user = new AuthUser();
                _this.user.id = 0;
                _this.user.role = "Guest";
            }
            RoleService_1.RoleService.setCurrentAuthUser(_this.user);
        });
        this.searchData1 = "";
    }
    AppComponent.prototype.getRequest = function () {
        console.log(this.searchData1);
        this.router.navigate(['home/all/search/' + this.searchData1]);
    };
    AppComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    AppComponent.prototype.search = function () {
        console.log("search");
        this.router.navigate(['home/all/search/' + this.searchData1]);
    };
    return AppComponent;
}());
__decorate([
    angular_l10n_1.Language(),
    __metadata("design:type", String)
], AppComponent.prototype, "lang", void 0);
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: '/partial/appComponent',
        providers: [RestService_1.RestService, RoleService_1.RoleService],
    }),
    __metadata("design:paramtypes", [ng2_completer_1.CompleterService, platform_browser_1.Title, router_1.Router, RestService_1.RestService])
], AppComponent);
exports.AppComponent = AppComponent;
var User = (function () {
    function User() {
        this.id = 0;
    }
    return User;
}());
var AuthUser = (function () {
    function AuthUser() {
        this.id = 0;
    }
    return AuthUser;
}());
//# sourceMappingURL=app.component.js.map