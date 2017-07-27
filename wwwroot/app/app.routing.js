"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var about_component_1 = require("./about.component");
var index_component_1 = require("./index.component");
var contact_component_1 = require("./contact.component");
var authorization_component_1 = require("./authorization.component");
var profile_component_1 = require("./profile.component");
var test_component_1 = require("./test.component");
var home_component_1 = require("./home.component");
var instructionBlock_component_1 = require("./instructionBlock.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent, data: { title: 'Home' } },
    { path: 'index', component: index_component_1.IndexComponent, data: { title: 'Index' } },
    { path: 'about', component: about_component_1.AboutComponent, data: { title: 'About' } },
    { path: 'contact', component: contact_component_1.ContactComponent, data: { title: 'Contact' } },
    { path: 'authorization', component: authorization_component_1.AuthorizationComponent, data: { title: 'Authorization' } },
    { path: 'test', component: test_component_1.TestComponent, data: { title: 'Test' } },
    { path: 'profile', component: profile_component_1.ProfileComponent, data: { title: 'profile' } },
    { path: 'instructionBlock', component: instructionBlock_component_1.InstructionBlockComponent, data: { title: 'InstructionBlock' } },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [home_component_1.HomeComponent, instructionBlock_component_1.InstructionBlockComponent, about_component_1.AboutComponent, index_component_1.IndexComponent, contact_component_1.ContactComponent, authorization_component_1.AuthorizationComponent, profile_component_1.ProfileComponent, test_component_1.TestComponent];
//# sourceMappingURL=app.routing.js.map