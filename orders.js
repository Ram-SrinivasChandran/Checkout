const orders=JSON.parse(localStorage.getItem("orders"))||[];
const orderDisplay=JSON.parse(localStorage.getItem("orderDisplay"))||[];
let totaldisplays=JSON.parse(localStorage.getItem("totaldisplay"))||[];
//localStorage.removeItem("totaldisplay");
//localStorage.removeItem("orderDisplay");
//console.log(totaldisplays);