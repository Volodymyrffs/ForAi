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




function removeFromCart(e) {
    let item_id = e.target.value;
    let url = "/remove/";
    let formData = new FormData();
    formData.append('item_id', item_id);

    fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'  // Установите заголовок X-Requested-With для указания AJAX-запроса
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Обработайте успешный ответ
            console.log('Элемент успешно удален из корзины.');
        } else {
            // Обработайте ошибку
            console.log('Ошибка при удалении элемента из корзины.');
        }
    })
    .catch(error => {
        console.log('Произошла ошибка при выполнении запроса:', error);
    });
}

