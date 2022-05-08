import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';;
import { DisplayOutcommingDataComponent } from './display-outcomming-data/display-outcomming-data.component'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { AddComponent } from './dialog/add/add.component';
import { AddSalaryComponent } from './dialog_salary/add_salary/add_salary.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteSalaryComponent } from './dialog_salary/delete_salary/delete.component';
import { EditSalaryComponent } from './dialog_salary/edit_salary/edit.component';
import { DeleteComponent } from './dialog/delete/delete.component';
import { EditComponent } from './dialog/edit/edit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { KpiCardComponent } from './kpi-card/kpi-card.component';
import { FinanceDashboardComponent } from './finance-dashboard/finance-dashboard.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DisplayIncommingDataComponent } from './display-incomming-data/display-incomming-data.component';
import { IncomingDoughnutChartComponent } from './incoming-doughnut-chart/incoming-doughnut-chart.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        HttpClientModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        AppRoutingModule,
        MatDialogModule,
        ChartsModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        DisplayOutcommingDataComponent,
        AddComponent,
        AddSalaryComponent,
        DeleteComponent,
        EditComponent,
        EditSalaryComponent,
        DeleteSalaryComponent,
        KpiCardComponent,
        FinanceDashboardComponent,
        DoughnutChartComponent,
        BarChartComponent,
        DisplayIncommingDataComponent,
        IncomingDoughnutChartComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: MatDialogRef, useValue: {} },
        { provide: MatDatepickerModule },
        { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };
platformBrowserDynamic().bootstrapModule(AppModule);