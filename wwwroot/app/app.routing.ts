
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { IndexComponent } from './index.component';
import { ContactComponent } from './contact.component';
import { AuthorizationComponent } from './authorization.component';
import { ProfileComponent } from './profile.component';
import { TestComponent } from './test.component';
import { HomeComponent } from './home.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'index', component: IndexComponent, data: { title: 'Index' } },
    { path: 'about', component: AboutComponent, data: { title: 'About' } },
    { path: 'contact', component: ContactComponent, data: { title: 'Contact' } },
    { path: 'authorization', component: AuthorizationComponent, data: { title: 'Authorization' } },
    { path: 'test', component: TestComponent, data: { title: 'Test' } },
    { path: 'profile', component: ProfileComponent, data: { title: 'profile' } },

];

export const routing = RouterModule.forRoot(appRoutes);

export const routedComponents = [HomeComponent, AboutComponent, IndexComponent, ContactComponent, AuthorizationComponent, ProfileComponent, TestComponent];
