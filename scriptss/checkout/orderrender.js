import { eachproductquantity } from "../../data/cart.js";
import { getproduct,loadproductsfetch} from "../../data/products.js";
import { totalprice } from "./payment.js";
import { orders } from "./order.js";




document.addEventListener('DOMContentLoaded', async function() {
  try {
      await orderrender();
      console.log("Orders have been rendered after page load");
  } catch (error) {
      console.error("Error during order rendering:", error);
  }
});
export async function  orderrender(){
    await loadproductsfetch();
    let htmlelement='';
    orders.forEach((item)=>{
        console.log(item);
     htmlelement+=`<div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>August 12</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${totalprice(item.products)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${gridgenerator(item.products)}
          </div>
        </div>`;
    });
    document.querySelector('.orders-grid').innerHTML=htmlelement;
}
function gridgenerator(product){
    let gridproducts='';
    
        product.forEach((items)=>{
            console.log(items);
         let mainproduct=getproduct(items);
          gridproducts+=` <div class="product-image-container">
              <img src="${mainproduct.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${mainproduct.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: August 15
              </div>
              <div class="product-quantity">
                Quantity: ${eachproductquantity(mainproduct)}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`
        });
    return gridproducts;
}