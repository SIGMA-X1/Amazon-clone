import {cart,deleteproduct,updatedeliveryId,cartquantity} from '../../data/cart.js';
import {products,getproduct} from '../../data/products.js';
import { getdeliveryoptions } from '../../data/deliveryoption.js';
import { changepricetodollar } from '../utils/money.js';
import { addorder } from './order.js';
import { deliveryoptions } from '../../data/deliveryoption.js';
export function paymentsummary(){
    let total=0;
    let shippingtotal=0;
   cart.forEach((item)=>{
      let obj=getproduct(item);
      if(obj){
        console.log(obj);
        console.log(obj.priceCents);
        console.log(item.quantity);

      total+=obj.priceCents*item.quantity;
      console.log(getdeliveryoptions(item.deliveryoptionId));
      shippingtotal+=getdeliveryoptions(item.deliveryoptionId).priceCents;
      }
      
   });
    console.log(total);
    console.log(shippingtotal);
    let btaxtotal=total+shippingtotal;
    let tax=(total+shippingtotal)*0.1;
    console.log(tax);
    let totalaftertax=total+shippingtotal+tax;
    console.log(`total ${totalaftertax}`);
    const paymenthtml=` <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartquantity()}):</div>
            <div class="payment-summary-money">$${changepricetodollar(total)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${changepricetodollar(shippingtotal)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${changepricetodollar(btaxtotal)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${changepricetodollar(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${changepricetodollar(totalaftertax)}</div>
          </div>

          <button class="place-order-button button-primary js-placeorder">
            Place your order
          </button>`; 
          document.querySelector('.payment-summary').innerHTML=paymenthtml;  
          document.querySelector('.js-placeorder').addEventListener('click',async()=>{
                  try{
                    const response=await fetch('https:supersimplebackend.dev/orders',{
                      method:'Post',
                      headers:{
                        'Content-Type':'application/json'
                      },
                      body:JSON.stringify({
                        cart:cart
                      })
                    });
                    const order=await response.json();
                    addorder(order);
                  }
                  catch(error){
                    console.log(error);
                  }
                  window.location.href='orders.html';
          });
}
export function totalprice(products){
  console.log(products);
 let totalpriceofallproduct=0;
 let obj;
 let carts;
 let deliverycents=0;
 let tax=0;
let finaltotal=0;
  products.forEach((item)=>{
        obj=getproduct(item)
        console.log(obj)
        cart.forEach((cartob)=>{
          console.log(cartob);
               if(obj.id===cartob.productId){
                console.log(cartob);
                deliveryoptions.forEach((del)=>{
                   if(cartob.deliveryoptionId===del.id){
                         deliverycents=del.priceCents;
                         console.log(deliverycents);
                   }
                });
                totalpriceofallproduct+=(obj.priceCents*cartob.quantity)+deliverycents;
                console.log(totalpriceofallproduct);
          
               }
        });
  });
  tax=totalpriceofallproduct*0.1;
  console.log(tax);
  
  finaltotal=changepricetodollar(totalpriceofallproduct+tax);
  console.log(finaltotal);

  return finaltotal;
}