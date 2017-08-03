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
var AppComponent = (function () {
    function AppComponent(completerService, titleService, router) {
        this.completerService = completerService;
        this.titleService = titleService;
        this.router = router;
        this.angularClientSideData = 'Angular';
        this.searchData = [
            { color: 'red', value: '#f00' },
            { color: 'green', value: '#0f0' },
            { color: 'blue', value: '#00f' },
            { color: 'cyan', value: '#0ff' },
            { color: 'magenta', value: '#f0f' },
            { color: 'yellow', value: '#ff0' },
            { color: 'black', value: '#000' }
        ];
        this.captains = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett'];
        this.searchData1 = "";
        this.dataService = completerService.local(this.searchData, 'color', 'color');
    }
    AppComponent.prototype.getRequest = function () {
        console.log(this.searchData1);
        this.router.navigate(['home/all/search/' + this.searchData1]);
    };
    AppComponent.prototype.setTitle = function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    AppComponent.prototype.handleKeyDown = function (event) {
        if (event.keyCode == 13) {
            this.router.navigate(['home/all/search/' + this.searchData1]);
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: '/partial/appComponent',
        providers: [RestService_1.RestService],
    }),
    __metadata("design:paramtypes", [ng2_completer_1.CompleterService, platform_browser_1.Title, router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map