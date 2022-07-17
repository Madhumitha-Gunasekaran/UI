import { Component } from '@angular/core';
import {ProductService} from './service/product.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:any;
  productDetails:any;
  images: any;
  pageCount=0;
  loadSpinner=false;
  constructor(private productService:ProductService){

  }
  ngOnInit(){
    this.productService.currentProduct.subscribe(res=>{ // subscribe on change of page count
      this.pageCount=res;
      if(this.pageCount>=0){
        if(this.title){
          this.receiveEvent(this.title);
        }
      }
    })
   
  }
 /* on receiving the search value call the api **/
  receiveEvent(e:any){
    this.loadSpinner=true;
    this.title=e;
    this.productService.getProductdata( this.title,this.pageCount,24).subscribe((res:any)=>{
      if(res.data){
        this.loadSpinner=false;
     this.productDetails=res.data;
     this.productDetails.products.forEach((img:any)=>{
      this.images=img.images;
        this.productService.getimage(this.images[0]).subscribe((val:any)=>{ // get base64 of image for zeroth index;
          img.images[0]='data:image/jpeg;base64,'+val
        }) 
     })
        console.log(this.productDetails)
      }
    })
  }
}
