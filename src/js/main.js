$( document ).ready(function() {

	
	function getProducts(){
	    $.ajax({
	        url: 'https://corebiz-test.herokuapp.com/api/v1/products',
	        type: 'GET'
	    }).done(function (data) {
	        renderProducts(data);
	    }).fail(function(xhr, err) {
	      console.log('error loading products', err);
	    })
	}
	function renderProducts(data) {
		console.log(data)

	    const _self = this;
	    data.map(s =>
	      $('.home__shelf .container ul.shelf').append(
	        `<li class="shelf__item">
	          <img class='shelf__image' src="${s.imageUrl}"/>
			  ${ s.listPrice ? `<span class='shelf__flag shelf__flag--off'>off</span> </span>` : "" }
	          <div class='shelf__content'>
		          <p class='shelf__name'>${s.productName}</p>
		          <span class='shelf__rating shelf__rating--${s.stars}'>${s.stars}</span>
		          ${ s.listPrice ? `<span class='shelf__listprice'>de <span>${((s.listPrice) / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace('.', ',')}</span> </span>` : `<span class='shelf__listprice'></span>` }
		          ${ s.listPrice ? `<span class='shelf__bestprice'> por ${((s.price) / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace('.', ',')} </span>` : `<span class='shelf__bestprice'> ${((s.price) / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace('.', ',')} </span>` }
		          ${s.installments[0] ? `<span class='shelf__installments'> ou ${s.installments[0].quantity}x de  ${((s.installments[0].value) / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace('.', ',')}</span>` : `<span class='shelf__installments'></span>`}
		          <button class='shelf__buybutton' type='button'>comprar</button>
	          </div>
	        </li>`
	      )
	    )	
    	shelfSlick()	
	}

	function shelfSlick() {
	    $('.home__shelf .container ul.shelf').slick({
	        dots: false,
	        infinite: true,
	        slidesToShow: 4,
	        slidesToScroll: 1,
	        arrows: true,
	        responsive: [{
	          breakpoint: 768,
	          settings: {
	            slidesToShow: 2,
	            slidesToScroll: 1,
	            dots: true
	          }
	        }]
	    });
	}

	function minicartCounter() {
		let counterSession = sessionStorage.getItem('minicartCounter');
		if(counterSession) {
			$('.header__minicart .counter span').html(counterSession)
		}
	}

	function buyProduct() {
		$('body').on('click', '.shelf__item .shelf__buybutton', function(){
			let counter = $('.header__minicart .counter span')
			let quantity = counter.html()
			let newquantity = parseInt(quantity) + 1
			counter.html(newquantity)
			sessionStorage.setItem('minicartCounter', newquantity);
		});
	}
	minicartCounter()
	getProducts()
	buyProduct()
});  



