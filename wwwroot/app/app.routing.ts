
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { IndexComponent } from './index.component';
import { ContactComponent } from './contact.component';
import { AuthorizationComponent } from './authorization.component';
import { ProfileComponent } from './profile.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: IndexComponent, data: { title: 'Home' } },
    { path: 'about', component: AboutComponent, data: { title: 'About' } },
    { path: 'contact', component: ContactComponent, data: { title: 'Contact' } },
    { path: 'authorization', component: AuthorizationComponent, data: { title: 'Authorization' } },
    { path: 'profile', component: ProfileComponent, data: { title: 'profile' } }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [AboutComponent, IndexComponent, ContactComponent, AuthorizationComponent, ProfileComponent];
