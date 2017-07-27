import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './Component/index.component';
import { ContactComponent } from './Component/contact.component';
import { AuthorizationComponent } from './Component/authorization.component';
import { ProfileComponent } from './Component/profile.component';
import { InstructionComponent } from './Component/instruction.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: IndexComponent, data: { title: 'Home' } },
    { path: 'contact', component: ContactComponent, data: { title: 'Contact' }},
    { path: 'authorization', component: AuthorizationComponent, data: { title: 'Authorization' } },
    { path: 'profile', component: ProfileComponent, data: { title: 'profile' } },
    { path: 'instruction', component: InstructionComponent, data: { title: 'instruction' }},
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [IndexComponent, ContactComponent, AuthorizationComponent, ProfileComponent, InstructionComponent];
