import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationComponent } from './Component/authorization.component';
import { ProfileComponent } from './Component/profile.component';
import { InstructionComponent } from './Component/instruction.component';
import { HomeComponent } from './Component/home.component';
import { InstructionBlockComponent } from './Component/instructionBlock.component';
import { CommentComponent } from './Component/comment.component';
import { DisplayInstructionComponent } from './Component/displayInstruction.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home/:property/:type/:value', component: HomeComponent, data: { title: 'Home' } },
    { path: 'home/:type/:value', component: HomeComponent, data: { title: 'Home' } },
    { path: 'home/:property', component: HomeComponent, data: { title: 'Home' } },
    { path: 'home/:property/:type', component: HomeComponent, data: { title: 'Home' } },
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'authorization', component: AuthorizationComponent, data: { title: 'Authorization' } },
    { path: 'profile/:id', component: ProfileComponent, data: { title: 'profile' } },
    { path: 'createInstruction/:id', component: InstructionComponent, data: { title: 'Instruction' } },
    { path: 'instruction', component: InstructionComponent, data: { title: 'instruction' }},
    { path: 'instructionBlock', component: InstructionBlockComponent, data: { title: 'InstructionBlock' } },
    { path: 'comment', component: CommentComponent, data: { title: 'Comment' } },
    { path: 'instruction/:id', component: DisplayInstructionComponent, data: { title: 'Display' } },

];

export const routing = RouterModule.forRoot(appRoutes);
export const routedComponents = [DisplayInstructionComponent, CommentComponent, HomeComponent, InstructionBlockComponent, AuthorizationComponent, ProfileComponent,InstructionComponent];