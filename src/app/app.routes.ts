import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


export const routes: Routes = [
    // {path:"", component:HomeComponent,canActivate:[authGuard]},
    {path:"login", component:LoginComponent,},
    {path:"register",component:RegisterComponent,},
    {path:"",component:ProductlistComponent,},
    { path: 'productdetail/:id', component: ProductDetailComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent },


];
