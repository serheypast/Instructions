﻿
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { Routes, RouterModule } from '@angular/router';

import { AuthorizationComponent } from './Component/authorization.component';
import { ProfileComponent } from './Component/profile.component';
import { InstructionComponent } from './Component/instruction.component';
import { TestComponent } from './test.component';
import { HomeComponent } from './home.component';
import { InstructionBlockComponent } from './instructionBlock.component';
import { CommentComponent } from './Component/comment.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'authorization', component: AuthorizationComponent, data: { title: 'Authorization' } },
    { path: 'profile/:id', component: ProfileComponent, data: { title: 'profile' } },
    { path: 'instruction', component: InstructionComponent, data: { title: 'instruction' }},
    { path: 'instructionBlock', component: InstructionBlockComponent, data: { title: 'InstructionBlock' } },
    { path: 'comment', component: CommentComponent, data : { title: 'Comment' } },
];

export const routing = RouterModule.forRoot(appRoutes);
export const routedComponents = [CommentComponent, HomeComponent, InstructionBlockComponent, AuthorizationComponent, ProfileComponent, TestComponent,InstructionComponent];