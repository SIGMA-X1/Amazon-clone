import {cart} from '../../data/cart.js';
export function rendercheckoutheader(){
    let totalquantity=0;
  cart.forEach((item)=>{
    totalquantity+=item.quantity;
  });
  console.log(totalquantity);
  document.querySelector('.checkoutitems').innerText=`${totalquantity} items`;
}