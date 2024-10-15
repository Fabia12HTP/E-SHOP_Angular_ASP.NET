import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RegistrationComponent } from './app/api-authorization/registration/registration.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoginComponent } from './app/api-authorization/login/login.component';
import { HomepageComponent } from './app/homepage/homepage.component';
import { ShoeDetailsComponent } from './app/shoe-details/shoe-details.component';
import { JwtModule } from '@auth0/angular-jwt';
import { errorHandlerInterceptor } from './app/api-authorization/error-handler.interceptor';
import { authGuard } from './app/api-authorization/auth.guard';
import { jwtInterceptor } from './app/api-authorization/jwt.interceptor';
import { ShoppingCartComponent } from './app/shopping-cart/shopping-cart.component';
import { UserProfileComponent } from './app/user-profile/user-profile.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { getStorage, provideStorage } from '@angular/fire/storage';

export function getBaseUrl() {
  return 'https://R1zy.bsite.net/api';
}

export function tokenGetter() {
  return localStorage.getItem("token");
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
];

bootstrapApplication(AppComponent, {
    providers: [
      providers,
      importProvidersFrom(BrowserModule, JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['https://R1zy.bsite.net/'],
          disallowedRoutes: [],
        },
      })),
      provideAnimations(),
      provideHttpClient(withInterceptors([errorHandlerInterceptor, jwtInterceptor])),
    provideRouter([
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'home', component: HomepageComponent},
        { path: 'login', component: LoginComponent},
        { path: 'register', component: RegistrationComponent },
        { path: 'home/detail', component: ShoeDetailsComponent, data: { page: ':page' } },
        { path: 'cart', component: ShoppingCartComponent, canActivate: [authGuard] },
        { path: 'profile', component: UserProfileComponent, canActivate: [authGuard] }     
      ]), provideFirebaseApp(() => initializeApp({"projectId":"clash-royale-4289e","appId":"1:570363405664:web:6b7f6d783f608477172a05","storageBucket":"clash-royale-4289e.appspot.com","apiKey":"AIzaSyDK2tnMGKgL_Cg4SXQ2YjSfYvR49qvWFH0","authDomain":"clash-royale-4289e.firebaseapp.com","messagingSenderId":"570363405664","measurementId":"G-LPCF9DC1G7"})), provideAnalytics(() => getAnalytics()), ScreenTrackingService, provideStorage(() => getStorage())
    ]
})
  .catch(err => console.error(err));
