import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { BookExistsGuard } from './guards/book-exists';
import { FindBookPageComponent } from './containers/find-book-page/find-book-page.component';
import { ViewBookPageComponent } from './containers/view-book-page/view-book-page.component';
import { CollectionPageComponent } from './containers/collection-page/collection-page.component';
import { NotFoundPageComponent } from './containers/not-found-page/not-found-page.component';
import { CsvComponent } from './containers/csv/csv.component';
import { ChartComponent } from './chart/chart.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: CollectionPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'book',
    component: FindBookPageComponent
  },
  {
    path: 'csv',
    component: CsvComponent
  },
  {
    path: 'chart',
    component: ChartComponent
  },
  {
    path: 'books',
    // canActivate: [ BookExistsGuard ],
    component: ViewBookPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
]

@NgModule({
  exports: [RouterModule],
  imports: [CommonModule,RouterModule.forRoot(appRoutes, { enableTracing: true })],
  declarations: []
})
export class AppRoutingModule { }
