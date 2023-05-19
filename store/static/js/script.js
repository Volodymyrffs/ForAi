function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');






let btns = document.querySelectorAll(".productContainer button")

btns.forEach(btn=>{
    btn.addEventListener("click", addToCart)
})


function addToCart(e){
    let product_id = e.target.value
    let url = "/add_to_cart"
    let data = {id:product_id}


    fetch(url, {
        method: "POST",
        headers: {"Content-Type":"application/json", 'X-CSRFToken': csrftoken},
        body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(data=>{
        document.getElementById("num_of_items").innerHTML = data
        console.log(data,product_id)
    })
    .catch(error=>{
        console.log(error)
    })
}

let btnsd = document.querySelectorAll(".productContainerD button")

btnsd.forEach(btn=>{
    btn.addEventListener("click", removeFromCart)
})


document.addEventListener('DOMContentLoaded', function() {
  let removeForms = document.querySelectorAll('.remove-form');
  removeForms.forEach(function(form) {
    form.addEventListener('submit', removeFromCart);
  });
});

function removeFromCart(e) {
    let item_id = e.target.value;
    let url = '/remove/${item_id}/';
console.log(csrftoken)
    console.log(url)
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Товар успешно удален из корзины.');
            // Обновите ваш интерфейс корзины, если необходимо
        } else {
            console.log('Ошибка при удалении товара из корзины.');
        }
    })
    .catch(error => {
        console.log('Произошла ошибка при выполнении запроса:', error);
    });
}