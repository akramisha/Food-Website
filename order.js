document.addEventListener("DOMContentLoaded", () => {
    // Initialize cart
    let cart = []
    updateCartDisplay()
  
    // Category filter functionality
    const categoryBtns = document.querySelectorAll(".category-btn")
    const menuItems = document.querySelectorAll(".menu-item")
  
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        categoryBtns.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        const category = this.getAttribute("data-category")
  
        // Show all items if 'all' category is selected
        if (category === "all") {
          menuItems.forEach((item) => {
            item.style.display = "block"
          })
        } else {
          // Show items of selected category and hide others
          menuItems.forEach((item) => {
            if (item.getAttribute("data-category") === category) {
              item.style.display = "block"
            } else {
              item.style.display = "none"
            }
          })
        }
      })
    })
  
    // Quantity controls
    const quantityBtns = document.querySelectorAll(".quantity-btn")
  
    quantityBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const input = this.parentElement.querySelector(".quantity-input")
        let value = Number.parseInt(input.value)
  
        if (this.classList.contains("minus")) {
          value = value > 1 ? value - 1 : 1
        } else {
          value = value < 10 ? value + 1 : 10
        }
  
        input.value = value
      })
    })
  
    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll(".add-to-cart-btn")
  
    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id")
        const name = this.getAttribute("data-name")
        const price = Number.parseFloat(this.getAttribute("data-price"))
        const quantity = Number.parseInt(this.parentElement.querySelector(".quantity-input").value)
  
        addToCart(id, name, price, quantity)
  
        // Show added animation
        this.textContent = "Added!"
        setTimeout(() => {
          this.textContent = "Add to Cart"
        }, 1500)
      })
    })
  
    // Cart functionality
    function addToCart(id, name, price, quantity) {
      // Check if item already exists in cart
      const existingItem = cart.find((item) => item.id === id)
  
      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        cart.push({
          id,
          name,
          price,
          quantity,
        })
      }
  
      updateCartDisplay()
    }
  
    // Update the cart item HTML structure to match the new form-like design
    function updateCartDisplay() {
      const cartItemsContainer = document.querySelector(".cart-items")
      const cartCount = document.querySelector(".cart-count")
      const subtotalElement = document.querySelector(".subtotal")
      const taxElement = document.querySelector(".tax")
      const totalElement = document.querySelector(".total-price")
      const checkoutBtn = document.querySelector(".checkout-btn")
  
      // Update cart count
      cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0)
  
      // Calculate totals
      const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
      const tax = subtotal * 0.08
      const deliveryFee = subtotal > 0 ? 2.99 : 0
      const total = subtotal + tax + deliveryFee
  
      // Update summary
      subtotalElement.textContent = `$${subtotal.toFixed(2)}`
      taxElement.textContent = `$${tax.toFixed(2)}`
      totalElement.textContent = `$${total.toFixed(2)}`
  
      // Enable/disable checkout button
      checkoutBtn.disabled = cart.length === 0
  
      // Clear cart items container
      cartItemsContainer.innerHTML = ""
  
      if (cart.length === 0) {
        // Show empty cart message
        cartItemsContainer.innerHTML = `
              <div class="empty-cart">
                  <i class="fas fa-shopping-cart"></i>
                  <p>Your cart is empty</p>
                  <p class="small">Add items to get started</p>
              </div>
          `
      } else {
        // Add cart items
        cart.forEach((item) => {
          const cartItemElement = document.createElement("div")
          cartItemElement.classList.add("cart-item")
          cartItemElement.innerHTML = `
                  <div class="cart-item-info">
                      <div class="cart-item-name">${item.name}</div>
                      <div class="cart-item-price">$${item.price.toFixed(2)} × ${item.quantity}</div>
                  </div>
                  <div class="cart-item-quantity">
                      <button class="cart-quantity-btn minus" data-id="${item.id}">-</button>
                      <span>${item.quantity}</span>
                      <button class="cart-quantity-btn plus" data-id="${item.id}">+</button>
                  </div>
                  <div class="remove-item" data-id="${item.id}">
                      <i class="fas fa-times"></i>
                  </div>
              `
          cartItemsContainer.appendChild(cartItemElement)
        })
  
        // Add event listeners to cart item buttons
        document.querySelectorAll(".cart-quantity-btn").forEach((btn) => {
          btn.addEventListener("click", function () {
            const id = this.getAttribute("data-id")
            const item = cart.find((item) => item.id === id)
  
            if (this.classList.contains("minus")) {
              if (item.quantity > 1) {
                item.quantity--
              } else {
                cart = cart.filter((item) => item.id !== id)
              }
            } else {
              if (item.quantity < 10) {
                item.quantity++
              }
            }
  
            updateCartDisplay()
          })
        })
  
        document.querySelectorAll(".remove-item").forEach((btn) => {
          btn.addEventListener("click", function () {
            const id = this.getAttribute("data-id")
            cart = cart.filter((item) => item.id !== id)
            updateCartDisplay()
          })
        })
      }
    }
  
    // Clear cart
    document.querySelector(".clear-cart").addEventListener("click", () => {
      cart = []
      updateCartDisplay()
    })
  
    // Mobile cart toggle
    document.querySelector(".cart-icon").addEventListener("click", () => {
      const cartSection = document.querySelector(".cart-section")
      cartSection.scrollIntoView({ behavior: "smooth" })
    })
  
    document.querySelector(".mobile-cart").addEventListener("click", () => {
      const cartSection = document.querySelector(".cart-section")
      cartSection.scrollIntoView({ behavior: "smooth" })
      document.querySelector(".mobile-menu").classList.remove("active")
    })
  
    // Checkout functionality
    const checkoutBtn = document.querySelector(".checkout-btn")
    const checkoutModal = document.getElementById("checkout-modal")
    const closeModalBtns = document.querySelectorAll(".close-modal")
  
    // Update the summary items in the checkout modal
    checkoutBtn.addEventListener("click", function () {
      if (!this.disabled) {
        // Populate order summary in modal
        const summaryItems = document.querySelector(".summary-items")
        const modalTotal = document.querySelector(".modal-total")
  
        summaryItems.innerHTML = ""
  
        cart.forEach((item) => {
          const summaryItem = document.createElement("div")
          summaryItem.classList.add("summary-item")
          summaryItem.innerHTML = `
                  <span>${item.quantity} × ${item.name}</span>
                  <span>$${(item.price * item.quantity).toFixed(2)}</span>
              `
          summaryItems.appendChild(summaryItem)
        })
  
        const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
        const tax = subtotal * 0.08
        const deliveryFee = 2.99
        const total = subtotal + tax + deliveryFee
  
        modalTotal.textContent = `$${total.toFixed(2)}`
  
        // Show modal
        checkoutModal.style.display = "block"
        document.body.style.overflow = "hidden"
      }
    })
  
    closeModalBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        checkoutModal.style.display = "none"
        document.getElementById("confirmation-modal").style.display = "none"
        document.body.style.overflow = "auto"
      })
    })
  
    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
      if (event.target === checkoutModal) {
        checkoutModal.style.display = "none"
        document.body.style.overflow = "auto"
      }
      if (event.target === document.getElementById("confirmation-modal")) {
        document.getElementById("confirmation-modal").style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  
    // Payment method toggle
    const paymentOptions = document.querySelectorAll('input[name="payment"]')
    const creditCardDetails = document.getElementById("credit-card-details")
  
    paymentOptions.forEach((option) => {
      option.addEventListener("change", function () {
        if (this.id === "credit-card") {
          creditCardDetails.style.display = "block"
        } else {
          creditCardDetails.style.display = "none"
        }
      })
    })
  
    // Place order
    document.querySelector(".place-order-btn").addEventListener("click", (e) => {
      e.preventDefault()
  
      // Simple form validation
      const name = document.getElementById("name").value
      const phone = document.getElementById("phone").value
      const address = document.getElementById("address").value
  
      if (!name || !phone || !address) {
        alert("Please fill in all required fields")
        return
      }
  
      // Hide checkout modal and show confirmation
      checkoutModal.style.display = "none"
  
      // Generate random order number
      const orderNumber = "GB" + Math.floor(10000 + Math.random() * 90000)
      document.getElementById("order-number").textContent = orderNumber
  
      // Show confirmation modal
      document.getElementById("confirmation-modal").style.display = "block"
  
      // Clear cart
      cart = []
      updateCartDisplay()
    })
  
    // Back to home button
    document.querySelector(".back-to-home").addEventListener("click", () => {
      window.location.href = "index.html"
    })
  
    // Theme toggle
    const themeToggle = document.getElementById("theme-toggle-checkbox")
    const htmlElement = document.documentElement
  
    // Check if user has a theme preference stored
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      htmlElement.className = savedTheme
      themeToggle.checked = savedTheme === "dark"
    }
  
    themeToggle.addEventListener("change", function () {
      if (this.checked) {
        htmlElement.className = "dark"
        localStorage.setItem("theme", "dark")
      } else {
        htmlElement.className = ""
        localStorage.setItem("theme", "")
      }
    })
  
    // Mobile menu
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const mobileMenu = document.querySelector(".mobile-menu")
  
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("active")
  
      // Animate hamburger to X
      const spans = this.querySelectorAll("span")
      if (mobileMenu.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(5px, 5px)"
        spans[1].style.opacity = "0"
        spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)"
      } else {
        spans[0].style.transform = "none"
        spans[1].style.opacity = "1"
        spans[2].style.transform = "none"
      }
    })
  })
  
//mobile menu
  document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const spans = mobileMenuBtn.querySelectorAll("span");

    mobileMenuBtn.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
        
        if (mobileMenu.classList.contains("active")) {
            // Show Cross (X)
            spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
            spans[1].style.opacity = "0"; // Hide middle line
            spans[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
        } else {
            // Show Normal Menu Lines
            spans[0].style.transform = "rotate(0)";
            spans[1].style.opacity = "1"; // Show middle line
            spans[2].style.transform = "rotate(0)";
        }
    });
});

