export function changepricetodollar(price){
    return (Math.round(price)/100).toFixed(2);
}