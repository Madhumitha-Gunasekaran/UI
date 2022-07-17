import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() productDetails: any

  pagecount: any;
  totalPage: any;
  constructor(private prodService: ProductService) { }

  ngOnInit(): void {
    this.totalPage = this.productDetails.paging.total_page;
    this.prodService.currentProduct.subscribe(res => { // get the current count value
      this.pagecount = res;
    })
  }
  /*pagination**/
  next(): void { //click of next button
    window.scrollTo(0, 0)
    this.totalPage = this.productDetails.paging.total_page;
    if (this.pagecount < this.totalPage) {
      this.prodService.changeProduct(this.pagecount + 1)
    }

  }
  previous(): void { // click of previous button
    window.scrollTo(0, 0)
    console.log(this.pagecount);
    if (this.pagecount >= 1) {
      this.prodService.changeProduct(this.pagecount - 1)
    }
    else {
      console.log('no page left')
    }
  }
  addToCart(): void { //button
    alert('Added to Cart')
  }

}
