import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone:true,
  imports:[CommonModule,FormsModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  totalItems: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.calculateTotals(); // Calculate totals initially
  }

  loadCartItems(): void {
    let cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = cart;
  }

  removeFromCart(index: number): void {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateTotals(); // Recalculate totals after removing an item
  }

  updateQuantity(event: any, index: number): void {
    const quantity = parseInt(event.target.value, 10);
    if (!isNaN(quantity) && quantity >= 0) {
      this.cartItems[index].quantity = quantity;
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.calculateTotals(); // Recalculate totals after updating quantity
    }
  }

  clearCart(): void {
    localStorage.removeItem('cart');
    this.cartItems = [];
    this.calculateTotals(); // Recalculate totals after clearing the cart
  }

  calculateTotals(): void {
    this.totalItems = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.totalAmount = this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
  handleCheckout(): void {
    this.router.navigate(['/checkout']);
    console.log('Handling checkout...');
  }
}
