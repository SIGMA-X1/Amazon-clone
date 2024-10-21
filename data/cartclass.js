class Cart{
    cartItems;
    #localStoragev;
    constructor(localStoragev){
        this.#localStoragev=localStoragev;
        this.#loadfromstorage();
    }
    #loadfromstorage(){
        this.cartItems=JSON.parse(localStorage.getItem(this.#localStoragev))||
        [{
            productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity:1,
            deliveryoptionId: '1'},{
            productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity:1,
            deliveryoptionId:'2'
        }];
      }
      savelocalStorage(){
        localStorage.setItem(this.#localStoragev,JSON.stringify(this.cartItems));
     }
     addtocart(productId){
        let obj;
           this.cartItems.forEach((item)=>{
             console.log(item.productId);
          
    
               if(productId===item.productId){
                 obj=item;
                 console.log(obj);
               }
           });
           if(obj){
             obj.quantity+=1;
           }else{
           this.cartItems.push({
             productId:productId,
             quantity:1,
             deliveryoptionId:'1'
           });
         }
          this.savelocalStorage();
           
    
    
    }
    deleteproduct(productId){
        this.cartItems=this.cartItems.filter((value)=>{
              if(productId!=value.productId){
                  return true;
              }
              return false;
        });
         this.savelocalStorage();
       
      }
      updatedeliveryId(productId,deliveryoptionid){
        console.log(productId);
        console.log(deliveryoptionid);
        let obj;
        this.cartItems.forEach((cartitem)=>{
         if(productId===cartitem.productId){
               obj=cartitem;
         }
        });
        console.log(obj);
        obj.deliveryoptionId=deliveryoptionid;
        this.savelocalStorage();
      }
      cartquantity(){
        let totalquantity=0;
        this.cartItems.forEach((item)=>{
          totalquantity+=item.quantity;
        });
           return totalquantity;
        
      }

}


    const cart=new Cart('cart-oop');
    const cartb=new Cart('cartb');
    console.log(cart);
    console.log(cartb);
    console.log(cartb instanceof Cart);
   /* cart.#localStoragev='hero';*/