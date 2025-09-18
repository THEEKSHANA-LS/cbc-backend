//read the cart... 
export default function loardCart(){

    let cartString = localStorage.getItem("cart"); //"[item1, item2, ....]"

    if(cartString == null){
        localStorage.setItem("cart", "[]");  //create empty array in local storage...
        cartString = "[]";
    }

    const cart = JSON.parse(cartString); //convert stringarry into array...

    return cart;
}

//add the product into the cart...
export default function addToCart(product, quantity){
    let cart = loardCart(); //firstly load cart...

    //check if the sellected item already in the cart...
    const existingItemIndex = cart.findIndex(
        (item)=>{
            return item.productId == product.productId
        }
    )

    if(existingItemIndex == -1){
        //item is not in cart...
        if(quantity < 1){
            console.log("Quantity must be at least 1")
            return
        }

        const cartItem = {
            productId : product.productId,
            name : product.name,
            price : product.price,
            labelledPrice : product.labelledPrice,
            quantity : quantity,
            image : product.image[0]
        }

        cart.push(cartItem) //add item to the array...

    } else {
        //item already in cart...
        const existingItemIndex = cart[existingItemIndex];

        const newQuantity = existingItemIndex.quantity + quantity;
        
        //remove current item from cart if quantity is less than 1...
        if(newQuantity < 1){
            cart = cart.filter(
                (item)=>{
                    return item.productId != product.productId;
                }
            )
        } else{
            cart[existingItemIndex].quantity = newQuantity;
        }
    }

    //save new cart in local storage...convert into string using JSON.sringify...
    localStorage.setItem("cart", JSON.stringify(cart));

}

