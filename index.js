class CartManager {
    constructor() {
        this.cartItems = []
    }

    addToCart(quantity) {
        this.cartItems = [...this.cartItems, {
            title: "Fall Limited Edition Sneakers",
            quantity: quantity,
            total: quantity * 125.00
        }]
    }

    clearCart() {
        this.cartItems = []
    }
}

const cartManagerInstance = new CartManager()
let currentImageIndex = 0;

const mobileMenuButton = document.querySelector("#js-menu-button")
const mobileMenuContainer = document.querySelector("#js-mobile-menu-container")
const mobileMenuCloseButtons = document.querySelectorAll("[data-close-button]")

mobileMenuButton.addEventListener("click", () => {
    mobileMenuContainer.setAttribute("data-open", "")
})

mobileMenuCloseButtons.forEach(element => {
    element.addEventListener('click', () => {
        mobileMenuContainer.removeAttribute("data-open")
    })
})


const quantityIncrementButton = document.querySelector("#js-quantity-increment-button")
const quantityDecrementButton = document.querySelector("#js-quantity-decrement-button")
const quantity = document.querySelector("[data-quantity]")


quantityIncrementButton.addEventListener("click", () => {
    const oldQuant = parseInt(quantity.innerHTML)
    if (oldQuant === 99) {
        return
    }

    quantity.innerHTML = oldQuant + 1
    quantity.setAttribute("data-quantity", oldQuant + 1)
})

quantityDecrementButton.addEventListener("click", () => {
    const oldQuant = parseInt(quantity.innerHTML)
    if (oldQuant === 0) {
        return
    }

    quantity.innerHTML = oldQuant - 1
    quantity.setAttribute("data-quantity", oldQuant - 1)
})


const thumbnails = document.querySelectorAll('.thumbnail')
const currentImage = document.querySelector("#js-current-image")
const imageNextButton = document.querySelector("#js-image-next")
const imagePreviousButton = document.querySelector("#js-image-previous")

imageNextButton.addEventListener("click", () => {
    if (currentImageIndex + 1 > thumbnails.length - 0) {
        return
    }
    currentImageIndex += 1
    thumbnails.forEach((element, index) => {
        const imageLink = element.getAttribute("data-image")
        if (imageLink && currentImageIndex === index) {
            currentImage.setAttribute("src", imageLink)


            thumbnails.forEach(element => {
                element.removeAttribute("data-selected")
            })
            element.setAttribute("data-selected", "")
            return
        }
    })
})


imagePreviousButton.addEventListener("click", () => {
    if (currentImageIndex - 1 < 0) {
        return
    }
    currentImageIndex -= 1
    thumbnails.forEach((element, index) => {
        const imageLink = element.getAttribute("data-image")
        if (imageLink && currentImageIndex === index) {
            currentImage.setAttribute("src", imageLink)

            thumbnails.forEach(element => {
                element.removeAttribute("data-selected")
            })
            element.setAttribute("data-selected", "")
            return
        }


    })

})

thumbnails.forEach((element, index) => {
    element.addEventListener('click', (e) => {
        const imageLink = element.getAttribute("data-image")

        if (imageLink) {
            currentImage.setAttribute("src", imageLink)
            currentImageIndex = index
        }

        thumbnails.forEach(element => {
            element.removeAttribute("data-selected")
        })

        element.setAttribute("data-selected", "")
    })
})



const addToCartButton = document.querySelector("#js-add-to-cart")
const cartContent = document.querySelector("#js-cart-content")
const cartItemsContainer = document.querySelector("#js-cart-items-container")
const cartItems = document.querySelector("#js-cart-items")
const cartButton = document.querySelector("#js-cart-button")
const cartMenu = document.getElementById("js-cart-menu")
const cartQuantity = document.querySelector("[data-cart-quantity]")

cartButton.addEventListener('click', () => {
    cartMenu.classList.toggle("cart-show")
})

addToCartButton.addEventListener('click', () => {

    const amount = quantity.getAttribute("data-quantity")

    if (amount <= 0) {
        return
    }
    cartManagerInstance.addToCart(parseInt(amount))


    cartContent.setAttribute("data-has-items", "")


    console.log(cartManagerInstance.cartItems)
    updateCartItems()
    quantity.setAttribute("data-quantity", "0")
    quantity.innerHTML = "0"


    document.querySelectorAll("[data-delete-button]").forEach((button) => {

        button.addEventListener('click', () => {
            console.log("LOL")
            cartManagerInstance.clearCart()
            updateCartItems()

        })

    })
})




function updateCartItems() {

    cartItems.innerHTML = ""

    if (cartManagerInstance.cartItems.length === 0) {
        cartQuantity.innerHTML = 0
        cartContent.removeAttribute("data-has-items")
        return
    }

    cartContent.setAttribute("data-has-items", "")
    cartQuantity.innerHTML = cartManagerInstance.cartItems.length

    cartManagerInstance.cartItems.map(item => {
        cartItems.innerHTML += `
        <div class="cart-item">
              <div class="cart-item-image">
                <img src="./images/image-product-1-thumbnail.jpg" />
              </div>
  
              <div class="cart-item-info">
                <span>Fall Limited Edition Sneakers</span>
                <span>$125.00 x ${item.quantity} <b>$${item.total.toFixed(2)}</b></span>
              </div>
  
              <div class="cart-item-action" data-delete-button>
                <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <defs>
                    <path
                      d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z"
                      id="a" />
                  </defs>
                  <use fill="currentColor" fill-rule="nonzero" xlink:href="#a" />
                </svg>
              </div>
            </div> 
        `
    })
}