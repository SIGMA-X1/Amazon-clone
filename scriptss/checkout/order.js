
export const orders=JSON.parse(localStorage.getItem('orders'))||[];
export function addorder(order){
    orders.unshift(order);
    savetolocalstorage();
  
}
function savetolocalstorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}


