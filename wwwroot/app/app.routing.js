"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var index_component_1 = require("./Component/index.component");
var contact_component_1 = require("./Component/contact.component");
var authorization_component_1 = require("./Component/authorization.component");
var profile_component_1 = require("./Component/profile.component");
var exit_about_guard_1 = require("./Component/exit.about.guard");
var instruction_component_1 = require("./Component/instruction.component");
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: index_component_1.IndexComponent, data: { title: 'Home' } },
    { path: 'contact', component: contact_component_1.ContactComponent, data: { title: 'Contact' }, canDeactivate: [exit_about_guard_1.ExitAboutGuard] },
    { path: 'authorization', component: authorization_component_1.AuthorizationComponent, data: { title: 'Authorization' } },
    { path: 'profile', component: profile_component_1.ProfileComponent, data: { title: 'profile' } },
    { path: 'instruction', component: instruction_component_1.InstructionComponent, data: { title: 'instruction' }, canDeactivate: [exit_about_guard_1.ExitAboutGuard] },
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
exports.routedComponents = [index_component_1.IndexComponent, contact_component_1.ContactComponent, authorization_component_1.AuthorizationComponent, profile_component_1.ProfileComponent, instruction_component_1.InstructionComponent];
//# sourceMappingURL=app.routing.js.map