import { changepricetodollar } from "../scriptss/utils/money.js";
class Product{
id;
image;
name;
rating;
priceCents;
constructor(product){
  this.id=product.id;
  this.image=product.image;
  this.name=product.name;
  this.rating=product.rating;
  this.priceCents=product.priceCents;
}
getStarsUrl(){
  return `images/ratings/rating-${this.rating.stars*10}.png`
}
getRating(){
  return this.rating.count;
}
getPrice(){
  return changepricetodollar(this.priceCents);
}
extraHtml(){
  return '';
}
}


export function getproduct(item){
  console.log(item);
    let obj;
    products.forEach((product)=>{
    if(item.productId===product.id){
         obj=product;
    }
    });
  
    console.log(obj);
    console.log('hello');
    return obj;

 
}
class Clothing extends Product{
  sizeChartLink;
  constructor(product){
    super(product);
    this.sizeChartLink=product.sizeChartLink;
  }
  extraHtml(){
    return `<a href="${this.sizeChartLink}" target="_blank">Size chart</a>`;
  }
}
class Appliances extends Product{
      instructionLink;
      warrantyLink;
      constructor(productdetails){
        super(productdetails);
        this.instructionLink=productdetails.instructionLink;
        this.warrantyLink=productdetails.warrantyLink;
      }
      extraHtml(){
        return `<a href="${this.instructionLink}" target="_blank">instructionLink</a>
                    <a href="${this.warrantyLink}" target="_blank">Warranty</a>`;
      }
}
/*const object3={
  method(){
   console.log(this);
  }
}
object3.method();*/
export let products=[];
export function loadproductsfetch(){
  const promise=fetch('https://supersimplebackend.dev/products').then((response)=>{
       return response.json();
  }).then((data)=>{
       products=data.map((productdetails)=>{
        if(productdetails.type==='clothing'){
          return new Clothing(productdetails);
        }else if(productdetails.type==='appliances'){
          return new Appliances(productdetails);
        }
         return new Product(productdetails);
      });
      console.log(products); 
   
  });
  return promise;
  
}

/*export function loadproducts(fun){
  console.log('is called');
  const xhr=new XMLHttpRequest();
  xhr.addEventListener('load',()=>{
   products=JSON.parse(xhr.response).map((productdetails)=>{
    if(productdetails.type==='clothing'){
      return new Clothing(productdetails);
    }else if(productdetails.type==='appliances'){
      return new Appliances(productdetails);
    }
     return new Product(productdetails);
  });
  console.log(products); 
  fun();
  });
  xhr.open('GET','https://supersimplebackend.dev/products');
  xhr.send();
}*/


/*const date=new Date();*/

 