import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HotToastService } from '@ngxpert/hot-toast';
@Component({
  selector: 'app-product-list',
  standalone:true,
  imports: [RouterOutlet,RouterLink,CommonModule],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent implements OnInit {
  products: any[] = [];
  errorMessage: string = '';
  private toastService = inject(HotToastService);
  constructor(private productService: ProductService,private cartService:CartService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (res) => {
      //   this.showToast()
      //  this.router.navigate(['/']);
      this.products=res.data
      console.log(this.products);
        
      },
      error => {
       console.log(error.error.message)
      //  this.errormessage=error.error.message
      //  this.toastService.error('Somthing went Wrong please try again ')
      }
    );
  }
  handleAddToCart(product: any) {
    this.cartService.addToCartLocal(product);
    //this.toastr.success('Item added to cart successfully');
    this.toastService.success('Item added to cart successfullyy',{
      style: {
      
        padding: '16px',
        color: '#713200',
      },
    })
  }
}
