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
        var body = JSON.stringify(user);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.http.post("api/editProfile", body, { headers: headers })
            .subscribe(function (data) {
            console.log('Response received');
            console.log(data);
        }, function (err) { console.log('Error'); }, function () { return console.log('Authentication Complete'); });
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
//# sourceMappingURL=RestService.js.map