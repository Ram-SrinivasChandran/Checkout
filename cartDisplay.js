let producthtmlcart='';
let randomnames=[];
let randomStrings=[];
const day=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const month=['January','February','March','April','May','June','July','August','September','October','November','December'];
const deliverytime=[1,5,9];
const deliverydates=[];
deliverytime.forEach((time)=>{
  const d=new Date();
  const date=addDays(d,time);
  deliverydates.push({
    date:date.getDate(),
    day:day[date.getDay()],
    month:month[date.getMonth()]
  })
});
function addDays(date, days) {
   date.setDate(date.getDate() + days);
   return date;
}
//console.log(deliverydates);
cartProducts.forEach((cartProduct)=>{
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  let randomname=generateString(10);
  let randomstring=generateString(20);
  randomnames.push(randomname);
  randomStrings.push(randomstring);
  
  let htmlcart=`<div class="product-one-cart js-product-container" data-product-container="${randomstring}">
  <div class="delivery-date-cart js-delivery-date"></div>
  <div class="product-cart">
    <div>
      <img class="product-image-cart" src="${cartProduct.productImage}">
    </div>
    <div class="product-info-cart">
      <div class="product-name-cart">
        ${cartProduct.productName}
      </div>
      <div class="product-price-cart">$${(cartProduct.productCost/100).toFixed(2)}</div>
      <div class="quantity-cart">
        <div class="js-quantity-change" data-quantity-change="quantity-changer">Quantity:<span class="quantity-display-checkout">${cartProduct.quantity}</span><input class="quantity-changer js-quantity-changer" value="${cartProduct.quantity}" data-quantity-changer-id="${cartProduct.Id}" type="number"> <span class="change-quantity-update js-update" data-name-update="update-quantity"> Update</span><span class="change-quantity-save js-save" data-save-update="save-quantity"> Save</span><span class="change-quantity-delete js-delete" data-delete-id="${cartProduct.Id}" > Delete</span></div>
      </div>
    </div>
    <div class="delivery-options-checkout">
      <div class="delivery-option-cart">Choose a delivery option:</div>
      <div class="shipping-cart">
        <div><input class="radio js-radio-button" name="${randomname}" type="radio" data-cart-product-id="${cartProduct.Id}" data-cart-id="free" checked></div>
        <div class="shipping-details-cart">
          <div class="date-receive">${deliverydates[2].day}, ${deliverydates[2].month} ${deliverydates[2].date}</div>
          <div class="shipping-rate">FREE Shipping</div>
        </div>
      </div>
      <div class="shipping-cart">
        <div><input class="radio js-radio-button" name="${randomname}" data-cart-product-id="${cartProduct.Id}"
        data-cart-id="fast"  type="radio"></div>
        <div class="shipping-details-cart">
          <div class="date-receive">${deliverydates[1].day}, ${deliverydates[1].month} ${deliverydates[1].date}</div>
          <div class="shipping-rate">$4.99-Shipping</div>
        </div>
      </div>
      <div class="shipping-cart">
        <div><input class="radio js-radio-button" name="${randomname}" data-cart-product-id="${cartProduct.Id}"
        data-cart-id="super-fast" type="radio"></div>
        <div class="shipping-details-cart">
          <div class="date-receive">${deliverydates[0].day}, ${deliverydates[0].month} ${deliverydates[0].date}</div>
          <div class="shipping-rate">$9.99-Shipping</div>
        </div>
      </div>
    </div>
  </div>
</div>`
    producthtmlcart+=htmlcart;
});
let noItem='<p class="empty-cart">Your cart is empty.</p><a href="https://ram-srinivaschandran.github.io/Amazon/"><button   class="view-product">View products</button></a>';
if(producthtmlcart===''){
  document.querySelector('.js-display-cart').innerHTML=noItem;
  document.querySelector('.js-order-button').disabled=true;
  document.querySelector('.js-order-button').classList.add("disable-button");
}
else{
  document.querySelector('.js-order-button').disabled=false;
  document.querySelector('.js-display-cart').innerHTML=producthtmlcart;
  document.querySelector('.js-order-button').classList.remove("disable-button");
  let cartCount=0;
  let itemsCost=0;
  let quantityChanged=[];
  let productContainers=document.querySelectorAll('.js-product-container');
  productContainers.forEach((container)=>{
    let productContainer=container.dataset.productContainer;
    randomStrings.forEach((randomString)=>{
      if(randomString===productContainer){
        let updateButton=container.querySelector('.js-update');
        let saveButton=container.querySelector('.js-save');
        updateButton.addEventListener('click',()=>{
          container.querySelector('.js-update').classList.add("update-js");
          container.querySelector('.js-save').classList.add("save-js");
          container.querySelector('.quantity-display-checkout').classList.add("display-checkout-js");
          container.querySelector('.js-quantity-changer').classList.add("quantity-changer-js");
        });
        let changedQuantity=0;
        saveButton.addEventListener('click',()=>{
          changedQuantity=container.querySelector('.js-quantity-changer');
          if(changedQuantity.value>0){
          let quantityChangerId=changedQuantity.dataset.quantityChangerId;
          container.querySelector('.js-update').classList.remove("update-js");
          container.querySelector('.js-save').classList.remove("save-js");
          container.querySelector('.quantity-display-checkout').classList.remove("display-checkout-js");
          container.querySelector('.quantity-display-checkout').innerHTML=changedQuantity.value;
          changedQuantity.classList.remove("quantity-changer-js");

          let idmatchingquantity;
          quantityChanged.forEach((quantityChanger)=>{
            if(quantityChanger.id===quantityChangerId){
              idmatchingquantity=quantityChanger;
            }
          });
          if(idmatchingquantity){
            idmatchingquantity.quantity=changedQuantity.value;
          }
          else{
            quantityChanged.push({
              id:quantityChangerId,
              quantity:changedQuantity.value
            });
          }
          quantityChanged.forEach((quantitychange)=>{
            cartProducts.forEach((cartProduct)=>{
              if(cartProduct.Id===quantitychange.id){
                cartProduct.quantity=quantitychange.quantity;
              }
            })
          });
          localStorage.setItem('cartProducts',JSON.stringify(cartProducts));
         orderSummary();
          }
          else{
            alert('Not a valid quantity')
          }
        });
        let deleteButton=container.querySelector('.js-delete');
        deleteButton.addEventListener('click',()=>{
          let deleteId=deleteButton.dataset.deleteId;
          let idmatching;
          cartProducts.forEach((cartProduct,index)=>{
            if(cartProduct.Id===deleteId){
              idmatching=index
              cartProducts.splice(idmatching,1);
              window.location.reload();
            }
          });
          localStorage.setItem('cartProducts',JSON.stringify(cartProducts));
         orderSummary();
        });
      }
    });  
  });
  deliverydate();
  /*document.querySelector('.js-delivery-date').innerHTML=`Delivery date:${deliverydates[2].day},${deliverydates[2].month} ${deliverydates[2].date}`*/
  function deliverydate(){
    let productContainer=document.querySelectorAll('.js-product-container');
  productContainer.forEach((container)=>{
    let radioButtons=container.querySelectorAll('.js-radio-button');
    radioButtons.forEach((radioButton)=>{
      let cartId=radioButton.dataset.cartId;
      if(cartId==='free'){
        if(radioButton.checked===true){
          container.querySelector('.js-delivery-date').innerHTML=`Delivery date: ${deliverydates[2].day},${deliverydates[2].month} ${deliverydates[2].date}`
        }
      }
      else if(cartId==='fast'){
        if(radioButton.checked===true){
          container.querySelector('.js-delivery-date').innerHTML=`Delivery date: ${deliverydates[1].day},${deliverydates[1].month} ${deliverydates[1].date}`
        }
      }
      else if(cartId==='super-fast'){
        if(radioButton.checked===true){
          container.querySelector('.js-delivery-date').innerHTML=`Delivery date: ${deliverydates[0].day},${deliverydates[0].month} ${deliverydates[0].date}`
        }
      }    
    });
  });
  }
  const shippingamounts=[];
  orderSummary();
let buttons=document.querySelectorAll('.js-radio-button');
buttons.forEach((button)=>{
  let cartProductId=button.dataset.cartProductId;
  let cartId=button.dataset.cartId;
  button.addEventListener('click',()=>{
    if(cartId==='free'){
      let idmatching;
    shippingamounts.forEach((shippingamount)=>{
      if(shippingamount.id===cartProductId){
        idmatching=shippingamount;
      }
    });
    if(idmatching){
      idmatching.amount=0;
    }
    else{
      shippingamounts.push({
        id:cartProductId,
        amount:0
      });
    }
    deliverydate();
    orderSummary();
    }
    else if(cartId==='fast'){
      let idmatching;
    shippingamounts.forEach((shippingamount)=>{
      if(shippingamount.id===cartProductId){
        idmatching=shippingamount;
      }
    });
    if(idmatching){
      idmatching.amount=499;
    }
    else{
      shippingamounts.push({
        id:cartProductId,
        amount:499
      });
    }
    deliverydate();
    orderSummary();
    }
    else if(cartId==='super-fast'){
      let idmatching;
      shippingamounts.forEach((shippingamount)=>{
      if(shippingamount.id===cartProductId){
        idmatching=shippingamount;
      }
    });
    if(idmatching){
      idmatching.amount=999;
    }
    else{
      shippingamounts.push({
        id:cartProductId,
        amount:999
      });
    }
    deliverydate();
    orderSummary();
    }
  });
});

  //console.log(total);
  document.querySelector('.js-order-button').addEventListener('click',()=>{
    let todayDate=new Date();
    todaydate.push(todayDate);
    localStorage.setItem('todaydate',JSON.stringify(todaydate));
  });
  document.querySelector('.js-order-button').addEventListener('click',()=>{
    total=document.querySelector('.js-total-cost');
    let totalsend=total.innerHTML;
  //console.log(totalsend);
    cartProducts.forEach((cartProduct)=>{
      orders.push({
        id:cartProduct.Id,
        productName:cartProduct.productName,
        productImage:cartProduct.productImage,
        productCost:cartProduct.productCost,
        quantity:cartProduct.quantity
      });
    });
    totaldisplays.push(totalsend);
      localStorage.setItem('totaldisplay',JSON.stringify(totaldisplays));
    localStorage.setItem('orders',JSON.stringify(orders));
    localStorage.removeItem("cartProducts");
    //console.log(orders);
    let productContainer=document.querySelectorAll('.js-product-container');
    productContainer.forEach((container)=>{
    let radioButtons=container.querySelectorAll('.js-radio-button');
    radioButtons.forEach((radioButton)=>{
      let cartId=radioButton.dataset.cartId;
      if(cartId==='free'){
        if(radioButton.checked===true){
          deliveryDateSave.push({
            date:deliverydates[2].date,
            day:deliverydates[2].day,
            month:deliverydates[2].month
        });
        }
      }
      else if(cartId==='fast'){
        if(radioButton.checked===true){
          if(radioButton.checked===true){
            deliveryDateSave.push({
              date:deliverydates[1].date,
              day:deliverydates[1].day,
              month:deliverydates[1].month
          });
          }
        }
      }
      else if(cartId==='super-fast'){
        if(radioButton.checked===true){
          if(radioButton.checked===true){
            deliveryDateSave.push({
              date:deliverydates[0].date,
              day:deliverydates[0].day,
              month:deliverydates[0].month
          });
          }
        }
      }    
    });
  });
  localStorage.setItem('deliveryDateSave',JSON.stringify(deliveryDateSave));
    window.location.reload();
  });
  
  function orderSummary(){
    //console.log(shippingamounts);
    //console.log(quantityChanged);
    //console.log(cartProducts);
    cartProducts.forEach((cartProduct)=>{
      cartCount+=Number(cartProduct.quantity);
    });
    cartProducts.forEach((cartProduct)=>{
      itemsCost+=cartProduct.quantity*cartProduct.productCost;
    });
    document.querySelector('.js-items-total-cost').innerHTML=`$${(itemsCost/100).toFixed(2)}`;
  document.querySelector('.js-total-quantity').innerHTML=cartCount;
  document.querySelector('.js-checkout-quantity').innerHTML=`${cartProducts.length} items`;
  let shippingandHandling=0;
  shippingamounts.forEach((shippingamount)=>{
    shippingandHandling+=shippingamount.amount;
  });
  document.querySelector('.js-sh-cost').innerHTML=`$${(shippingandHandling/100).toFixed(2)}`;
  let taxCalculation=itemsCost+shippingandHandling;
  document.querySelector('.js-before-tax-total').innerHTML=`$${(taxCalculation/100).toFixed(2)}`;
  document.querySelector('.js-tax').innerHTML=`$${((taxCalculation*0.1)/100).toFixed(2)}`;
  total=document.querySelector('.js-total-cost')
  total.innerHTML=`$${((taxCalculation+(taxCalculation*0.1))/100).toFixed(2)}`;
  itemsCost=0;
  cartCount=0;
}
}


