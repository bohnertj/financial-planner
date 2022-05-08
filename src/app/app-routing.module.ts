import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayOutcommingDataComponent } from './display-outcomming-data/display-outcomming-data.component';
import { FinanceDashboardComponent } from './finance-dashboard/finance-dashboard.component';
import { DisplayIncommingDataComponent } from './display-incomming-data/display-incomming-data.component';
import { HomeComponent } from './home';
import { AuthGuard } from './_helpers';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);


const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
   // { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'display-outcomming-data', component: DisplayOutcommingDataComponent, canActivate: [AuthGuard] },
    { path: 'display-incomming-data', component: DisplayIncommingDataComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: FinanceDashboardComponent, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }