import {cart,addtocart} from '../data/cart.js';
import {products,loadproductsfetch} from '../data/products.js';
import { changepricetodollar } from './utils/money.js';
loadproductsfetch().then(()=>{
  renderproduct();
});
function renderproduct(){
let producthtml='';
products.forEach((product)=>{
producthtml+=` <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.getRating()}
            </div>
          </div>

          <div class="product-price">
            $${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          ${product.extraHtml()}
          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary Addtocart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`

});
function addquantity(){
  let quantity=0;
  cart.forEach((item)=>{
    quantity+=item.quantity;
  });
  console.log(quantity);
  document.querySelector('.cart-quantity').innerHTML=quantity;
}
document.querySelector('.js-productsList').innerHTML=producthtml;
const Addbtn=document.querySelectorAll('.Addtocart')
Addbtn.forEach((button)=>{
    button.addEventListener('click',()=>{
      
          const productId=button.dataset.productId;
          addtocart(productId);
          addquantity();
          
          
            
    });
})
}