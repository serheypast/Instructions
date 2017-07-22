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
var TestComponent = (function () {
    function TestComponent(http) {
        var _this = this;
        http.get('/api/api/city/').subscribe(function (result) {
            _this.user = result.json();
            console.log(_this.user);
        });
    }
    return TestComponent;
}());
TestComponent = __decorate([
    core_1.Component({
        selector: 'test',
        templateUrl: '/partial/testComponent'
    }),
    __metadata("design:paramtypes", [http_1.Http])
], TestComponent);
exports.TestComponent = TestComponent;
//# sourceMappingURL=test.component.js.map