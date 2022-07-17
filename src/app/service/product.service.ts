import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  prodService=new BehaviorSubject<any>(0)
  currentProduct= this.prodService.asObservable();
  
  constructor(private http: HttpClient) {}

  getProductdata(searchTerm: any,count: any,pageperitem: any){
    return this.http.get(`http://localhost:5000/products/`+encodeURIComponent(searchTerm)+'/'+encodeURIComponent(count)+'/'+encodeURIComponent(pageperitem),{responseType: 'json'})
  }
  getimage(url:any){
    return this.http.get('http://localhost:5000/image/'+encodeURIComponent(url),{responseType: 'text'})
  }
  changeProduct(val: any){
    this.prodService.next(val);
  }
}
