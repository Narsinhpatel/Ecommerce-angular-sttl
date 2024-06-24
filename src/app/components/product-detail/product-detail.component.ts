import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-product-detail',
  standalone:true,
  imports:[RouterOutlet,RouterLink,CommonModule,LoaderComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: any;
  errorMessage: string = '';
  private toastService = inject(HotToastService);
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartservice:CartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProduct(productId);
    }
  }

  loadProduct(id: string) {
    this.productService.getProductById(id).subscribe(  (res) => {
      //   this.showToast()
      //  this.router.navigate(['/']);
    this.product=res.data
      console.log(res);
        
      },
      error => {
       console.log(error.error.message)
      //  this.errormessage=error.error.message
      //  this.toastService.error('Somthing went Wrong please try again ')
      });

  }
  handleAddToCart(product: any) {
    this.cartservice.addToCartLocal(product);
    //this.toastr.success('Item added to cart successfully');
    this.toastService.success('Item added to cart successfully',{
      style: {
      
        padding: '16px',
        color: '#713200',
      },
    })
  }
}
