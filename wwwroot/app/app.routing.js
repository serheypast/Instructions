"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var authorization_component_1 = require("./Component/authorization.component");
var profile_component_1 = require("./Component/profile.component");
var instruction_component_1 = require("./Component/instruction.component");
var home_component_1 = require("./Component/home.component");
var instructionBlock_component_1 = require("./Component/instructionBlock.component");
var comment_component_1 = require("./Component/comment.component");
var displayInstruction_component_1 = require("./Component/displayInstruction.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home/:property/:type/:value', component: home_component_1.HomeComponent, data: { title: 'Home' } },
    { path: 'home/:type/:value', component: home_component_1.HomeComponent, data: { title: 'Home' } },
    { path: 'home/:property', component: home_component_1.HomeComponent, data: { title: 'Home' } },
    { path: 'home/:property/:type', component: home_component_1.HomeComponent, data: { title: 'Home' } },
    { path: 'home', component: home_component_1.HomeComponent, data: { title: 'Home' } },
    { path: 'authorization', component: authorization_component_1.AuthorizationComponent, data: { title: 'Authorization' } },
    { path: 'profile/:id', component: profile_component_1.ProfileComponent, data: { title: 'profile' } },
    { path: 'createInstruction/:id', component: instruction_component_1.InstructionComponent, data: { title: 'Instruction' } },
    { path: 'instruction', component: instruction_component_1.InstructionComponent, data: { title: 'instruction' } },
    { path: 'instructionBlock', component: instructionBlock_component_1.InstructionBlockComponent, data: { title: 'InstructionBlock' } },
    { path: 'comment', component: comment_component_1.CommentComponent, data: { title: 'Comment' } },
    { path: 'instruction/:id', component: displayInstruction_component_1.DisplayInstructionComponent, data: { title: 'Display' } },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [displayInstruction_component_1.DisplayInstructionComponent, comment_component_1.CommentComponent, home_component_1.HomeComponent, instructionBlock_component_1.InstructionBlockComponent, authorization_component_1.AuthorizationComponent, profile_component_1.ProfileComponent, instruction_component_1.InstructionComponent];
//# sourceMappingURL=app.routing.js.map