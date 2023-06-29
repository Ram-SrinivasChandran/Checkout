const orders=JSON.parse(localStorage.getItem("orders"))||[];
const orderDisplay=JSON.parse(localStorage.getItem("orderDisplay"))||[];
let totaldisplays=JSON.parse(localStorage.getItem("totaldisplay"))||[];
let deliveryDateSave=JSON.parse(localStorage.getItem('deliveryDateSave'))||[];
let deliveryDate=JSON.parse(localStorage.getItem('deliveryDate'))||[];
let todaydate=JSON.parse(localStorage.getItem('todaydate'))||[];
if(deliveryDateSave.length!=0){
  deliveryDate.push(deliveryDateSave);
localStorage.removeItem("deliveryDateSave");
localStorage.setItem('deliveryDate',JSON.stringify(deliveryDate));
}
//console.log(todaydate);
//console.log(deliveryDate);
//console.log(deliveryDateSave);
//localStorage.removeItem("totaldisplay");
//localStorage.removeItem("todaydate");
//localStorage.removeItem("orderDisplay");
//localStorage.removeItem("deliveryDate");
//console.log(totaldisplays);