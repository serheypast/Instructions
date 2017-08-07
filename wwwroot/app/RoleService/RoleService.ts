import { Component } from '@angular/core';
import { RestService } from "./../RestService/RestService";

@Component({
    providers: [RestService],
})

export class RoleService {
    private static _instance: RoleService = new RoleService();
    private static AuthUser: AuthUser;
    constructor() {
        if (RoleService._instance) {
            throw new Error("The Logger is a singleton class and cannot be created!");
        }
        RoleService._instance = this;
    }
    
    public static getCurrentAuthUser(): AuthUser {
        let user: AuthUser = new AuthUser();
        user.id = 3214;
        user.role = "admin";
        if (this.AuthUser == null) {
            return user;
        }
        return this.AuthUser;
    }

    public static setCurrentAuthUser(_authUser: AuthUser) {

        this.AuthUser = _authUser;
    }

    public static getInstance(): RoleService {
        return RoleService._instance;
    }
}


class AuthUser {
    id: number;
    role: string;
}