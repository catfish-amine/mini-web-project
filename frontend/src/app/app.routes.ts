import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';


export const routes: Routes = [
    { path: '',title:"Welcome Page", component: HomeComponent },
    { path: 'users',title:"User list", component: UsersComponent },

];