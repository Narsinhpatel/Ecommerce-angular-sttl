import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/v1/products';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  // Fetch all products
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getallproducts`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch a single product by id
  getProductById(productId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/product/${productId}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }



  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // Log to console for now
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
