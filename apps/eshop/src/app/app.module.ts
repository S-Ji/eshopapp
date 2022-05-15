import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { UiModule } from '@eshopapp/ui';
import {AccordionModule} from 'primeng/accordion';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@eshopapp/products';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrdersModule } from '@eshopapp/orders';
import { MessagesComponent } from './shared/messages/messages.component';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { JwtInterceptor, UsersModule } from '@eshopapp/users';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxStripeModule } from 'ngx-stripe';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  }
];


@NgModule({
  declarations: [
    AppComponent, 
    HomePageComponent,
    HeaderComponent, 
    FooterComponent, 
    NavComponent, MessagesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    RouterModule.forRoot(routes), 
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    UiModule, 
    AccordionModule,
    ProductsModule,
    OrdersModule,
    ToastModule,
    UsersModule,
    NgxStripeModule.forRoot('pk_test_51KyjeaICWCMurG9y08ZFo9jCA7R65MmqoXIHQbwTltJihbkUfvv1CWR7Q5C9ND4qaqvZUbvkO6vfOESqWcRx0x7y00Pp2zdIM3')
  ],
  providers: [
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  exports: [
    MessagesComponent
  ],
})
export class AppModule {}
