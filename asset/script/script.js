//var url = 'https://cors-anywhere.herokuapp.com/'+'http://the19am.com/uph/json/coffeeshop.json'
var url = 'http://the19am.com/uph/json/?p=coffeeshop'
var item = new Set()
async function navCat() {
    var data = await axios.get(url)
    data.data.forEach(cat => {
        item.add(cat.cat)
    })
    item.forEach(cat => {
        $('#navCat').append(
            `<a class="dropdown-item" href="product.html">${cat}</a>`
        )
    })
}
navCat();

$('.ig-list-pic').ready(() => {
    for (var i = 1; i <= 8; i++) {
        $('.ig-list-pic').append(`
        <div class="ig-pic m-3 br">
            <a href="https://instagram.com"><img src="https://picsum.photos/1080?random=${i}" id='${i}'></a>
            <h3 style="display: none" id="ig-${i}"><i class="fa fa-heart"></i></h3>
        </div>
        `)
    }
    $('.ig-pic').hover(
        (e) => {
            $('#ig-' + e.target.id).css('display', 'block')
        },
        (e) => {
            $('#ig-' + e.target.id).css('display', 'none')
        }
    )
})


$('.product-cat').ready(async function (res) {
    var data = await axios.get(url)
    data.data.forEach(cat => {
        item.add(cat.cat)
    })
    item.forEach(cat => {
        $('#normal-prod').append(`
<div class="mb-5">
                <h3>${cat}</h3>
                <div class="dropdown-divider"></div>
                <div class="row mt-5" class='product-list' id="${cat}">
                </div>
<div>
        `)

    })
})

function curFor(cur) {
    return new Intl.NumberFormat().format(cur)
}

async function getData() {
    return await axios.get('http://the19am.com/uph/json/?p=coffeeshop');
}

$('.product-list').ready(async function () {
    let datas = await getData();
    console.log(datas)
    datas.data.forEach((data, idx) => {
        if (idx % 3 === 0) {
            $(`div#best-prod`).append(`
        <div class="col-12 col-md-6">
            <div class="row item" id='f${data.kode}'>
                <div class="col-12 col-lg-4">
                    <img src="https://source.unsplash.com/800x${800+idx}/?coffee,tea" class='p-img mb-2'>
                </div>
                <div class="col-12 col-lg-8 item-title">
                    <h4 class="mb-1">${data.nama_produk}</h4>
                    <a data-toggle="collapse" href="#itemf${data.kode}" role="button" aria-expanded="false" aria-controls="itemf${data.kode}" class="text-dark">
                        <p class="m-0 ml-2">${data.short_desc}
                            
                        </p>
                    </a>
                    <div class="collapse p-2" id="itemf${data.kode}" data-parent=".product-cat">
                        <div class='dropdown-divider'></div>
                        <p>${data.desc}</p>
                        <p class="text-right font-weight-bold m-0" style="text-decoration : line-through">IDR ${curFor(data.price)}</p>
                        <p class="text-right font-weight-bold">IDR ${curFor(data.price-(data.price*0.1))}</p>
                    </div>
                </div>
            </div>
        </div>
        `)
            $(`div[id = '${data.cat}']`).append(`
        <div class="col-12 col-md-6">
            <div class="row item" id='${data.kode}'>
                <div class="col-12 col-lg-4">
                    <img src="https://source.unsplash.com/800x${800+idx}/?coffee,tea" class='p-img mb-2'>
                </div>
                <div class="col-12 col-lg-8 item-title">
                    <h4 class="mb-1">${data.nama_produk}</h4>
                    <a data-toggle="collapse" href="#item${data.kode}" role="button" aria-expanded="false" aria-controls="item${data.kode}" class="text-dark">
                        <p class="m-0 ml-2">${data.short_desc}
                            
                        </p>
                    </a>
                    <div class="collapse p-2" id="item${data.kode}" data-parent="#normal-prod">
                        <div class='dropdown-divider'></div>
                        <p>${data.desc}</p>
                        <p class="text-right font-weight-bold m-0" style="text-decoration : line-through">IDR ${curFor(data.price)}</p>
                        <p class="text-right font-weight-bold">IDR ${curFor(data.price-(data.price*0.1))}</p>
                    </div>
                </div>
            </div>
        </div>
        `)
        } else
            $(`div[id = '${data.cat}']`).append(`
        <div class="col-12 col-md-6">
            <div class="row item" id='${data.kode}'>
                <div class="col-12 col-lg-4">
                    <img src="https://source.unsplash.com/800x${800+idx}/?coffee,tea" class='p-img mb-2'>
                </div>
                <div class="col-12 col-lg-8 item-title">
                    <h4 class="mb-1">${data.nama_produk}</h4>
                    <a data-toggle="collapse" href="#item${data.kode}" role="button" aria-expanded="false" aria-controls="item${data.kode}" class="text-dark">
                        <p class="m-0 ml-2">${data.short_desc}
                            
                        </p>
                    </a>
                    <div class="collapse p-2" id="item${data.kode}" data-parent="#normal-prod">
                        <div class='dropdown-divider'></div>
                        <p>${data.desc}</p>
                        <p class="text-right font-weight-bold">IDR ${curFor(data.price)}</p>
                    </div>
                </div>
            </div>
        </div>
        `)
    })


    $('div.item').click(function () {
        $('#item' + this.id).collapse('toggle')
    })
})


$(window).scroll(function () {
    var windowBottom = $(this).scrollTop() + window.innerHeight;
    $("div#nf").each(function () {
        var objectBottom = $(this).offset().top
        if (objectBottom < windowBottom) {
            $(this).addClass('fade-in-fwd');
        }
    });
}).scroll();

