const fadeElements = document.querySelectorAll('.fade-in');

window.addEventListener('DOMContentLoaded', () => {
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('show');
        }, index * 300);
    });
});



let cart = [];

const addButtons = document.querySelectorAll('.add-btn');
const cartCount = document.getElementById('cartCount');
const cartDropdown = document.getElementById('cartDropdown');
const cartIcon = document.getElementById('cartIcon');

addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.product-card');
        const name = card.querySelector('h3').textContent;
        const price = card.querySelector('.price').textContent;

        cart.push({ name, price });
        updateCart();

        btn.textContent = "ADDED ✓";
        setTimeout(() => { btn.textContent = "ADD TO CART"; }, 1000);
    });
});

function updateCart(){
    if(!cartCount) return;
    cartCount.textContent = cart.length;
    renderCartDropdown();
}

function renderCartDropdown(){
    cartDropdown.innerHTML = "";
    if(cart.length === 0){
        cartDropdown.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += parseFloat(item.price.replace('$',''));
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `<span>${item.name} - ${item.price}</span><span class="remove-item" data-index="${index}">✕</span>`;
        cartDropdown.appendChild(div);
    });

    const totalDiv = document.createElement('div');
    totalDiv.className = 'cart-total';
    totalDiv.innerHTML = `<span>Total</span><span>$${total.toFixed(2)}</span>`;
    cartDropdown.appendChild(totalDiv);


    document.querySelectorAll('.remove-item').forEach(el => {
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = e.target.getAttribute('data-index');
            cart.splice(idx, 1);
            updateCart();
        });
    });
}

if(cartIcon){
    cartIcon.addEventListener('click', () => {
        cartDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if(!cartIcon.contains(e.target)){
            cartDropdown.classList.remove('show');
        }
    });
}



const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const messageInput = document.getElementById('messageInput');
const charCounter = document.getElementById('charCounter');
const sendBtn = document.getElementById('sendBtn');
const successMsg = document.getElementById('successMsg');

if(messageInput){
    messageInput.addEventListener('input', () => {
        charCounter.textContent = `${messageInput.value.length} / 300`;
    });
}


function isValidEmail(email){
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function setError(inputEl, errorEl, message){
    if(message){
        errorEl.textContent = message;
        inputEl.classList.add('input-error');
    } else {
        errorEl.textContent = "";
        inputEl.classList.remove('input-error');
    }
}

if(sendBtn){
    sendBtn.addEventListener('click', () => {
        let isValid = true;


        if(nameInput.value.trim() === ""){
            setError(nameInput, document.getElementById('nameError'), "Name is required");
            isValid = false;
        } else {
            setError(nameInput, document.getElementById('nameError'), "");
        }

    
        if(emailInput.value.trim() === ""){
            setError(emailInput, document.getElementById('emailError'), "Email is required");
            isValid = false;
        } else if(!isValidEmail(emailInput.value.trim())){
            setError(emailInput, document.getElementById('emailError'), "Please enter a valid email address");
            isValid = false;
        } else {
            setError(emailInput, document.getElementById('emailError'), "");
        }

    
        if(messageInput.value.trim() === ""){
            setError(messageInput, document.getElementById('messageError'), "The message cannot be empty");
            isValid = false;
        } else {
            setError(messageInput, document.getElementById('messageError'), "");
        }

    
        if(isValid){
            successMsg.textContent = " Your message has been sent successfully ✅";
            successMsg.classList.add('show');


            nameInput.value = "";
            emailInput.value = "";
            messageInput.value = "";
            charCounter.textContent = "0 / 300";

            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 4000);
        } else {
            successMsg.classList.remove('show');
        }
    });
}