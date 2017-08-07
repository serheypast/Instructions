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
var angular_l10n_1 = require("angular-l10n");
var HomeComponent = (function () {
    function HomeComponent(service, activateRoute, locale) {
        var _this = this;
        this.service = service;
        this.activateRoute = activateRoute;
        this.locale = locale;
        this.icons = [];
        this.subscription = activateRoute.params.subscribe(function (params) {
            _this.type = params['type'];
            _this.property = params['property'];
            _this.value = params['value'];
        });
        service.getCategories().subscribe(function (result) {
            _this.categories = result.json();
        });
        service.getTags().subscribe(function (result) {
            _this.tags = result.json();
        });
        this.loadIcons();
    }
    HomeComponent.prototype.selectLanguage = function (language) {
        this.locale.setCurrentLanguage(language);
    };
    HomeComponent.prototype.loadIcons = function () {
        this.icons.push("fa-medkit");
        this.icons.push("fa-picture-o");
        this.icons.push("fa-car");
        this.icons.push("fa-flask");
        this.icons.push("fa-briefcase");
        this.icons.push("fa-desktop");
    };
    return HomeComponent;
}());
__decorate([
    angular_l10n_1.Language(),
    __metadata("design:type", String)
], HomeComponent.prototype, "lang", void 0);
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        templateUrl: '/partial/homeComponent',
        styleUrls: ['./css/Components/homeComponent.css'],
        providers: [RestService_1.RestService],
    }),
    __metadata("design:paramtypes", [RestService_1.RestService, router_1.ActivatedRoute, angular_l10n_1.LocaleService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
var Category = (function () {
    function Category() {
    }
    return Category;
}());
var Tag = (function () {
    function Tag() {
    }
    return Tag;
}());
//# sourceMappingURL=home.component.js.map