const cartToggle= document.getElementById("cart-toggle");
      cartMenu= document.getElementById("cart-menu");
      cartClose= document.getElementById("cart-close");
    
/*=====SHOW MENU=======*/
if(cartToggle){
    cartToggle.addEventListener("click",()=>{
        cartMenu.classList.add("show-menu");
    })
}


/*======CLOSE MENU=======*/
if(cartClose){
    cartClose.addEventListener("click",()=>{
        cartMenu.classList.remove("show-menu");
    })
}

/*============Adding Product in Cart===========*/
let productsInCart=[]


const cartSpace= document.querySelector("#cart-list");
       cartDot= document.querySelector("#cart-dot")
        cartProducts= document.querySelectorAll("#product");
        cartSumPrice = document.querySelector('#sum-prices');
        cartDot=document.querySelector(".cart__dot");

    const countTheSumPrice = function () { // 4
            let sum = 0;
            productsInCart.forEach(item => {
                sum += item.price;
            });
            return sum;
        }
        

const updateShoppingCartHTML = function () {  // 3
        
        if (productsInCart.length > 0) {
            let result = productsInCart.map(product => {
                return `
                    <li class="buyItem">
                        <img src="${product.image}" style="width:80px; height:80px;">
                        <div>
                            <h5>${product.name}</h5>
                            <h6>Rs ${product.price}</h6>
                            <div>
                                <button class="button-minus" data-id=${product.id}>-</button>
                                <span class="countOfProduct">${product.count}</span>
                                <button class="button-plus" data-id=${product.id}>+</button>
                            </div>
                        </div>
                    </li>`
            });
            cartSpace.innerHTML = result.join('');
            document.querySelector('.checkout').classList.remove('hidden');
            cartSumPrice.innerHTML = 'Rs' + countTheSumPrice();
    
        }
        else {
            document.querySelector('.checkout').classList.add('hidden');
            cartDot.classList.remove("show__dot")
            cartSpace.innerHTML = '<h4 class="product__title" style=" position:absolute;left:30%;top: 50%;">Shopping cart is empty.</h4>';
            cartSumPrice.innerHTML = '';
        }
    }      
      
function updateProductsInCart(product) { // 2
        for (let i = 0; i < productsInCart.length; i++) {
            if (productsInCart[i].id == product.id) {
                productsInCart[i].count += 1;
                productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
                return;
            }
        }
        productsInCart.push(product);
}      

cartProducts.forEach(item=>{  //1
    item.addEventListener("click",(e)=>{
        if(e.target.classList.contains('product__img')){
            const productID=e.target.dataset.productId;
            const productName= item.querySelector(".product__title").innerHTML;
            const productPrice= item.querySelector(".priceValue").innerHTML;
            const productImage=item.querySelector("img").src;
            let product={
                name: productName,
                image: productImage,
                id: productID,
                count:1,
                price:+productPrice,
                basePrice:+productPrice,
            }
            cartDot.classList.add("show__dot")
            cartMenu.classList.add("show-menu");
            updateProductsInCart(product);
            updateShoppingCartHTML();
            
        }    
          
    })
})

cartSpace.addEventListener('click', (e) => { // Last
	const isPlusButton = e.target.classList.contains('button-plus');
	const isMinusButton = e.target.classList.contains('button-minus');
	if (isPlusButton || isMinusButton) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1
				}
				else if (isMinusButton) {
					productsInCart[i].count -= 1
				}
				productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
		updateShoppingCartHTML();
	}
});

updateShoppingCartHTML();

