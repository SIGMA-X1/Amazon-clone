export let cart;
loadfromstorage();
export function loadfromstorage(){
  cart=JSON.parse(localStorage.getItem('cart'))||
  [{
      productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity:1,
      deliveryoptionId: '1'},{
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity:1,
      deliveryoptionId:'2'
  }];
}
 function savelocalStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
 }
export function addtocart(productId){
    let obj;
       cart.forEach((item)=>{
         console.log(item.productId);
      

           if(productId===item.productId){
             obj=item;
             console.log(obj);
           }
       });
       if(obj){
         obj.quantity+=1;
       }else{
       cart.push({
         productId:productId,
         quantity:1,
         deliveryoptionId:'1'
       });
     }
       savelocalStorage();
       console.log(cart);


}
export function deleteproduct(productId){
  cart=cart.filter((value)=>{
        if(productId!=value.productId){
            return true;
        }
        return false;
  });
  savelocalStorage();
  console.log(cart);
}
export function updatedeliveryId(productId,deliveryoptionid){
  console.log(productId);
  console.log(deliveryoptionid);
  let obj;
  cart.forEach((cartitem)=>{
   if(productId===cartitem.productId){
         obj=cartitem;
   }
  });
  console.log(obj);
  obj.deliveryoptionId=deliveryoptionid;
  savelocalStorage();
}
export function cartquantity(){
  let totalquantity=0;
  cart.forEach((item)=>{
    totalquantity+=item.quantity;
  });
     return totalquantity;
  
}
export let carts=[];
export async function loadcartsfetch(){
const response=await fetch('https://supersimplebackend.dev/cart');
const data=await response;
console.log(data);
}
 export function eachproductquantity(product){
  console.log('quantity');
  console.log(product);
  let quantityy=0;
  cart.forEach((item)=>{
    console.log(item);
    if(product.id===item.productId){
      quantityy=item.quantity;
    }
  });
  console.log(quantityy);
  return quantityy;
 }
