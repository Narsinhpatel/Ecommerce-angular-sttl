import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service' // Make sure to have the correct path

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  items: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
  selectedPayment: string = 'cash';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService // Inject the CartService
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required]
    });
  }

  get form() { return this.checkoutForm.controls; }

  calculateTotalAmount(): number {
    return this.items.reduce((amount, item) => item.product.price * item.quantity + amount, 0);
  }

  onSubmit(): void {
   

    const order = {
      items: this.items,
      selectedAddress: this.checkoutForm.value,
      selectedPayment: this.selectedPayment,
      totalAmount: this.calculateTotalAmount(),
      totalItem: this.items.length,
      status: 'Pending'
    };


    // Add order to the cart service
    const userId = '639f8723e44b3c88d47c00b2'; 
   
    this.cartService.addToCartDatabase({ userId, items: this.items }).subscribe(
      response => {
        console.log('Order saved to database:', response);

        // Clear cart after successful order placement
        localStorage.removeItem('cart');

        // Redirect to order success page or order details page
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error saving order to database:', error);
      }
    );
  }

  handlePaymentChange(paymentMethod: string): void {
    this.selectedPayment = paymentMethod;
  }
}
