import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `http://localhost:3000/api/v1/cart`; // Your backend API URL

  constructor(private http: HttpClient) {}

  addToCartLocal(product: any): void {
    let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cart.findIndex((item: any) => item.product._id === product._id);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }


  addToCartDatabase(cart: any): Observable<any> {
    const transformedItems = cart.items.map((item:any) => ({
      product:item.product._id,
      price:item.product.price,
      quantity:item.quantity
    }));

    const transformedCart = {
      userId: cart.userId, // Assuming userId is passed along with cart
      items: transformedItems
    };

    console.log('Transformed Cart:', transformedCart);

    return this.http.post(`${this.apiUrl}/createOrUpdateCart`, transformedCart);
  }

  getCartById(cartId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${cartId}`);
  }

  // Update your existing addToCart function
  // addToCart(product: any): void {
  //   this.addToCartLocal(product);

  //   const userId = 'someUserId'; // Retrieve the actual user ID from your auth service
  //   const cart = this.getLocalCart(userId);

  //   this.addToCartDatabase(cart).subscribe(
  //     response => {
  //       console.log('Cart saved to database:', response);
  //     },
  //     error => {
  //       console.error('Error saving cart to database:', error);
  //     }
  //   );
  // }

  // private getLocalCart(userId: string): Cart {
  //   let cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  //   return { userId, items: cartItems };
  // }
}
