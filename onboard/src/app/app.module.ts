import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

//Angular Material imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, MatCheckboxModule, MatSnackBarModule, MatToolbarModule, MatAutocompleteModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginUserComponent } from './login-user/login-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { WebInterceptor } from '../api/WebInterceptor';
import { UserCrudComponent } from './user-crud/user-crud.component';

const appRoutes: Routes = [
  { path: '', component: LoginUserComponent },  
  { path: 'users', component: UserListComponent },
  { path: 'users/crud/:userId',  component: UserCrudComponent },
  { path: 'users/crud',  component: UserCrudComponent  },
  { path: '**',  component: PageNotFoundComponent  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    UserListComponent,
    PageNotFoundComponent,
    HeaderComponent,
    UserCrudComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatAutocompleteModule    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WebInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
