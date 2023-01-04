var product = [{
    id: 1,
    img: 'images/Chicken Satay.jpg',
    name: 'Chicken Satay',
    price: 500,
    description: 'กุ้งแช่น้ำปลา ipsum dolor sit  Vero, repellendus dolorem quae labore culpa alias? Ad, libero soluta, perspiciatis quibusdam officia consequuntur sunt similique dolor fugiat aperiam cupiditate, temporibus fugit?',
    type: 'appetizes'
}, {
    id: 2,
    img: 'images/Raw Fresh Prawns in Aromatized Fish Sauce.jpg',
    name: 'Raw Fresh Prawns',
    price: 7600,
    description: 'Chicken ipsum dolor sit  Vero, repellendus dolorem quae labore culpa alias? Ad, libero soluta, perspiciatis quibusdam officia consequuntur sunt similique dolor fugiat aperiam cupiditate, temporibus fugit?',
    type: 'salad'
}, {
    id: 3,
    img: 'images/Fried-Slices-Pork-Shoulder.jpg',
    name: 'Pork Shoulder',
    price: 6000,
    description: 'Shoulder ipsum dolor sit  Vero, repellendus dolorem quae labore culpa alias? Ad, libero soluta, perspiciatis quibusdam officia consequuntur sunt similique dolor fugiat aperiam cupiditate, temporibus fugit?',
    type: 'fried'
}];
$(document).ready(() => {
    var html = '';

    for (let i = 0; i < product.length; i++) {
        html += `<div onclick="openProductDetail(${i})" class="product-itimes ${product[i].type}">
                 <img class="product-img" src="${product[i].img}" alt="">
                 <p style="font-size: 1.2vw;">${product[i].name}</p>
                 <p style="font-size: 1.3vw;">${numberWithCommas(product[i].price) + ' THB'}</p>
             </div>`;

    }
    $("#productlist").html(html);
})

function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}
function searchsomething(elem) {
    //console.log(elem.id);
    var value = $('#' + elem.id).val()
    console.log(value)

    var html = '';
    for (let i = 0; i < product.length; i++) {
        if (product[i].name.includes(value)) {
            html += `<div onclick="openProductDetail(${i})" class="product-itimes ${product[i].type}">
                 <img class="product-img" src="${product[i].img}" alt="">
                 <p style="font-size: 1.2vw;">${product[i].name}</p>
                 <p style="font-size: 1.3vw;">${numberWithCommas(product[i].price) + ' THB'}</p>
             </div>`;
        }
        if (html == '') {
            $("#productlist").html(`<p>Not Found Product</p>`);
        } else {
            $("#productlist").html(html);
        }

    }

}

function searchproduct(param) {
    console.log(param)
    $(".product-itimes").css('display', ' none')
    if (param == 'all') {
        $(".product-itimes").css('display', 'block')

    }
    else {
        $("." + param).css('display', 'block')
    }
}

var productindex = 0;
function openProductDetail(index) {
    productindex = index;
    console.log(productindex)
    $("#modalDesc").css('display', 'flex')
    $("#mdd-img").attr('src', product[index].img);
    $("#mdd-name").text(product[index].name);
    $("#mdd-price").text(numberWithCommas(product[index].price) + ' THB')
    $("#mdd-desc").text(product[index].description);
}

function closeModal() {
    $(".modal").css('display', 'none')
}

var cart = [];
function addtocart() {
    var pass = true;

    for (let i = 0; i < cart.length; i++) {
        if (productindex == cart[i].index) {
            console.log('found same product')
            cart[i].count++;
            pass = false;
        }
    }
    if (pass) {
        var obj = {
            index: productindex,
            id: product[productindex].id,
            name: product[productindex].name,
            price: product[productindex].price,
            img: product[productindex].img,
            count: 1
        };
        // console.log(obj)
        cart.push(obj)
    }
    console.log(cart)

    Swal.fire({
        icon: 'success',
        title: 'Add ' + product[productindex].name + ' to cart !'
    })
    $('#cartcount').css('display', 'flex').text(cart.length)
}

function openCart() {
    $('#modalCart').css('display', 'flex')
    rendercart();
}
function rendercart() {
    if(cart.length > 0) {
        var html = '';
        for (let i = 0; i < cart.length; i++) {
            html += `<div class="cartlist-items">
                        <div class="cartlist-left">
                            <img src="${cart[i].img}" alt="">
                            <div class="cartlist-detail">
                                <p style="font-size: 1.5vw;">${cart[i].name}</p>
                                <p style="font-size: 1.2vw;">${ numberWithCommas(cart[i].price * cart[i].count) } THB</p>
                            </div>
                        </div>
                        <div class="cartlist-right">
                            <p onclick="deinitems('-', ${i})" class="btnc">-</p>
                            <p id="countitems${i}" style="margin: 0 20px;">${cart[i].count}</p>
                            <p onclick="deinitems('+', ${i})" class="btnc">+</p>
                        </div>
                    </div>`;
        }
        $("#mycart").html(html)
    }
    else {
        $("#mycart").html(`<p>Not found product list</p>`)
    }
}


function deinitems(action, index) {
    if(action == '-') {
        if(cart[index].count > 0) {
            cart[index].count--;
            $("#countitems"+index).text(cart[index].count)

            if(cart[index].count <= 0) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Are you sure to delete?',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel'
                }).then((res) => {
                  if(res.isConfirmed) {
                     cart.splice(index, 1) 
                     console.log(cart)
                     rendercart();
                     $("#cartcount").css('display','flex').text(cart.length)
                     
                     if(cart.length <= 0) {
                        $("#cartcount").css('display','none')
                     }
                  }  
                  else {
                    cart[index].count++;
                    $("#countitems"+index).text(cart[index].count)
                    rendercart();
                  }
                })
            }
            rendercart();
        }
        
    }
    else if(action == '+') {
        cart[index].count++;
        $("#countitems"+index).text(cart[index].count)
        rendercart();
    }
}