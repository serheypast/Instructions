"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var authorization_component_1 = require("./Component/authorization.component");
var profile_component_1 = require("./Component/profile.component");
var instruction_component_1 = require("./Component/instruction.component");
var test_component_1 = require("./test.component");
var home_component_1 = require("./home.component");
var instructionBlock_component_1 = require("./instructionBlock.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent, data: { title: 'Home' } },
    { path: 'authorization', component: authorization_component_1.AuthorizationComponent, data: { title: 'Authorization' } },
    { path: 'profile/:id', component: profile_component_1.ProfileComponent, data: { title: 'profile' } },
    { path: 'instruction', component: instruction_component_1.InstructionComponent, data: { title: 'instruction' } },
    { path: 'instructionBlock', component: instructionBlock_component_1.InstructionBlockComponent, data: { title: 'InstructionBlock' } },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [home_component_1.HomeComponent, instructionBlock_component_1.InstructionBlockComponent, authorization_component_1.AuthorizationComponent, profile_component_1.ProfileComponent, test_component_1.TestComponent, instruction_component_1.InstructionComponent];
//# sourceMappingURL=app.routing.js.map