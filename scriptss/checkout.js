import { loadproductsfetch} from "../data/products.js";
import { paymentsummary } from "./checkout/payment.js";
import { render } from "./checkout/ordersummary.js";
import { loadcartsfetch } from "../data/cart.js";

    async function loadpage(){
        console.log('helllo bro');
        try{ 
           await Promise.all([
                 loadproductsfetch(),
                 loadcartsfetch()
            ]);
            render();
            paymentsummary();          
          }
            catch(error){
            console.log('error occured1');
            }
        
   }
        
loadpage();
/*Promise.all([
    new Promise((resolve)=>{
        console.log('promise sarted');
           loadproducts(()=>{
    
            console.log('finished');
               resolve('value1');
           });
    }),
    new Promise((resolve)=>{
        loadcarts(()=>{
        resolve('value2');
        });
    })

]).then((v)=>{
    console.log(v); 
   render();
   paymentsummary();
});*/
/*new Promise((resolve)=>{
    console.log('promise sarted');
       loadproducts(()=>{

        console.log('finished');
           resolve('value1');
       });
}).then((v)=>{
    console.log(v);
    return new Promise((resolve)=>{
        loadcarts(()=>{
        resolve();
        });
    }).then(()=>{
        render();
        paymentsummary();
    });
     
});*/
/*new Promise((resolve)=>{
   loadproductsfetch().then(()=>{
   render();
   paymentsummary();
});
});*/
