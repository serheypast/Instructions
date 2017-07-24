
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './Component/about.component';
import { IndexComponent } from './Component/index.component';
import { ContactComponent } from './Component/contact.component';
import { AuthorizationComponent } from './Component/authorization.component';
import { ProfileComponent } from './Component/profile.component';
import { ExitAboutGuard } from './Component/exit.about.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: IndexComponent, data: { title: 'Home' } },
    { path: 'about', component: AboutComponent, data: { title: 'About' }, canDeactivate: [ExitAboutGuard] },
    { path: 'contact', component: ContactComponent, data: { title: 'Contact' }, canDeactivate: [ExitAboutGuard] },
    { path: 'authorization', component: AuthorizationComponent, data: { title: 'Authorization' } },
    { path: 'profile', component: ProfileComponent, data: { title: 'profile' } }
];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [AboutComponent, IndexComponent, ContactComponent, AuthorizationComponent, ProfileComponent];
