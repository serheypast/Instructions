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
var RestServiceComponent = (function () {
    function RestServiceComponent(http) {
        this.http = http;
    }
    RestServiceComponent.prototype.getUserById = function (id) {
        return this.http.get('/api/api/getUser/' + id).map(function (response) { return response.json(); });
    };
    return RestServiceComponent;
}());
RestServiceComponent = __decorate([
    core_2.Component({}),
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RestServiceComponent);
exports.RestServiceComponent = RestServiceComponent;
//# sourceMappingURL=RestService.js.map