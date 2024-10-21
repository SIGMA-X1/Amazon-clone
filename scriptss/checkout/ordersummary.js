import {cart,deleteproduct,updatedeliveryId} from '../../data/cart.js';
import {products,getproduct} from '../../data/products.js';
import { changepricetodollar } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryoptions, getdeliveryoptions } from '../../data/deliveryoption.js';
import { paymentsummary } from './payment.js';
import { rendercheckoutheader } from './checkoutheader.js';





console.log(cart);
export function render(){
 let htmlelementt='';
cart.forEach((item)=>{
    const obj=getproduct(item);
    
    let deliverydate
    let cartdeliveryID=item.deliveryoptionId;
    const today=dayjs();
    console.log(deliveryoptions)
    let deliveryoption=getdeliveryoptions(cartdeliveryID);
   
   if(deliveryoption.id==='1'){
    deliverydate=today.add(7,'days');
    console.log(deliverydate);
    deliverydate=deliverydate.format('dddd, MMMM D');
   } else if(deliveryoption.id==='2'){
   deliverydate=today.add(3,'days');
   deliverydate=deliverydate.format('dddd, MMMM D');
  }else if(deliveryoption.id==='3'){
   deliverydate=today.add(1,'days');
   deliverydate=deliverydate.format('dddd, MMMM D');
  }



    htmlelementt+=`<div class="cart-item-container delete${obj.id}">
            <div class="delivery-date">
              Delivery date: ${deliverydate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${obj.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${obj.name}
                </div>
                <div class="product-price">
                  $${obj.getPrice()}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary" data-product-id="${obj.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryoptionelement(obj,item)}
              </div>
            </div>
          </div>`;
});

function deliveryoptionelement(obj,items){
  let html='';
  const today=dayjs();
  let deliverydate;
let format;
let price;
  deliveryoptions.forEach((item)=>{

     console.log(item.id);
     if(item.id==='1'){
       deliverydate=today.add(7,'days');
       console.log(deliverydate);
       format=deliverydate.format('dddd, MMMM D');
       price='Free';

     }else if(item.id==='2'){
      deliverydate=today.add(3,'days');
      format=deliverydate.format('dddd, MMMM D');
      price='$'+changepricetodollar(item.priceCents);
     }else if(item.id==='3'){
      deliverydate=today.add(1,'days');
      format=deliverydate.format('dddd, MMMM D');
      price='$'+changepricetodollar(item.priceCents);
     }
     console.log(items);
     const ischecked= item.id===items.deliveryoptionId;
    html+=`<div class="delivery-option js-radio-btn" data-product-id="${obj.id}" data-delievry-option-id="${item.id}">
                  <input type="radio"
                  ${ischecked ? 'checked':''}
                    class="delivery-option-input"
                    name="delivery-option-${obj.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${format}
                    </div>
                    <div class="delivery-option-price">
                      ${price} - Shipping
                    </div>
                  </div>
                </div>`
  });
  return html;
}
console.log(htmlelementt);
console.log(htmlelementt);
document.querySelector('.order-summary').innerHTML=htmlelementt;
document.querySelectorAll('.delete-quantity-link').
forEach((btn)=>{
    btn.addEventListener('click',(event)=>{
      event.preventDefault();
       const productId= btn.dataset.productId;
       deleteproduct(productId);
       const elem=document.querySelector(`.delete${productId}`);
       elem.remove();
       render();
       paymentsummary();
       rendercheckoutheader();
    });
  

});
document.querySelectorAll('.js-radio-btn').forEach((element)=>{
  element.addEventListener('click',(event)=>{
    event.preventDefault();
    console.log(element.dataset);
    const{productId,delievryOptionId}=element.dataset;
    updatedeliveryId(productId,delievryOptionId);
    render();
    paymentsummary();
    rendercheckoutheader();
  });
});
rendercheckoutheader();
}

