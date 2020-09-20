import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { TodoComponent } from '../../pages/todo/todo.component';
import { AddTodoComponent } from '../../pages/todo/add-todo/add-todo.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'books',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'todos',           component: TodoComponent },
    { path: 'todos/addTodo',           component: AddTodoComponent }
];
