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
var ng2_cloudinary_1 = require("ng2-cloudinary");
var ProfileComponent = (function () {
    function ProfileComponent(http) {
        var _this = this;
        this.http = http;
        this.uploader = new ng2_cloudinary_1.CloudinaryUploader(new ng2_cloudinary_1.CloudinaryOptions({ cloudName: 'dr4opxk5i', uploadPreset: 'ajvv2x7e' }));
        this.changeField = true;
        http.get('/api/api/city/').subscribe(function (result) {
            _this.user = result.json();
            if (_this.user.urlPhoto == null)
                _this.user.urlPhoto = "j8khmafnd7hbxwpxy0kb";
            console.log(_this.user);
        });
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            var res = JSON.parse(response);
            _this.user.urlPhoto = res.public_id;
            return { item: item, response: response, status: status, headers: headers };
        };
    }
    ProfileComponent.prototype.onChange = function (event) {
        this.uploader.uploadAll();
    };
    ProfileComponent.prototype.change = function () {
        this.changeField = !this.changeField;
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component is destroyed
        console.log("sergey byu");
        var body = JSON.stringify(this.user);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.http.post("api/api/editProfile", body, { headers: headers })
            .subscribe(function (data) {
            console.log('Response received');
            console.log(data);
        }, function (err) { console.log('Error'); }, function () { return console.log('Authentication Complete'); });
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        templateUrl: '/partial/profileComponent',
    }),
    __metadata("design:paramtypes", [http_1.Http])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
var UserProfile = (function () {
    function UserProfile() {
    }
    return UserProfile;
}());
//# sourceMappingURL=profile.component.js.map