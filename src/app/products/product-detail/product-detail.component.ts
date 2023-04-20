import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  product: Product;

  delete() {
    this
      .productService
      .deleteProduct(this.product.id)
      .subscribe(
        () => {
          console.log('Product deleted!');
          this.productService.initProducts();
          this.router.navigateByUrl('/products');
        }
      );
  }

  constructor(
    activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    const id = activatedRoute.snapshot.params.id;

    productService
      .getProductById(id)
      .subscribe(
        result => this.product = result
      )

  }

}
