 export const deliveryoptions=[{
    id:'1',
    deliverydate:7,
    priceCents:0
},{
    id:'2',
    deliverydate:3,
    priceCents:499
},{
    id:'3',
    deliverydate:1,
    priceCents:999
}];
export function getdeliveryoptions(cartdeliveryID){
    console.log(cartdeliveryID);
    let deliveryoption;
    deliveryoptions.forEach((object)=>{
        if(object.id===cartdeliveryID){
           deliveryoption=object;
        }
 });
 return deliveryoption || deliveryoptions[0];
}