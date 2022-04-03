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
import { DisplayIncomingDataComponent } from './display-incoming-data/display-incoming-data.component'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';;
import { AddComponent } from './dialog/add/add.component'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';;
import { DeleteComponent } from './dialog/delete/delete.component' ;
import { EditComponent } from './dialog/edit/edit.component'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { KpiCardComponent } from './kpi-card/kpi-card.component';
import { FinanceDashboardComponent } from './finance-dashboard/finance-dashboard.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component'
;
import { BarChartComponent } from './bar-chart/bar-chart.component'
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
        DisplayIncomingDataComponent ,
        AddComponent ,
        DeleteComponent ,
        EditComponent ,
        KpiCardComponent,
        FinanceDashboardComponent,
        DoughnutChartComponent ,
        BarChartComponent  
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: MatDialogRef, useValue: {}},
        { provide: MatDatepickerModule},
        { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }

        // provider used to create fake backend
    //    fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };