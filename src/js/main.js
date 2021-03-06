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
	    const _self = this;
	    data.map(s =>
	      $('.home__shelf .container ul.shelf').append(
	        `<li class="shelf__item">
	        	<a href="#linkproduto" title="${s.productName}">
	          	<img class='shelf__image' loading='lazy' src="${s.imageUrl}" alt="${s.productName}" width="216" height="200"/>
	          </a>
			  ${ s.listPrice ? `<span class='shelf__flag shelf__flag--off'>off</span> </span>` : "" }
	          <div class='shelf__content'>
		          <a href="#linkproduto" title="${s.productName}"><p class='shelf__name'>${s.productName}</p></a>
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
	function bannerSlick() {
	    $('.home__banner').slick({
	        dots: false,
	        infinite: true,
	        slidesToShow: 1,
	        slidesToScroll: 1,
	        arrows: false,
	        dots: true,
	        swipeToSlide: true
	    });
	}
	function shelfSlick() {
	    $('.home__shelf .container ul.shelf').slick({
	        dots: false,
	        infinite: true,
	        slidesToShow: 4,
	        slidesToScroll: 1,
	        arrows: true,
	        swipeToSlide: true,
	        responsive: [{
	          breakpoint: 991,
	          settings: {
	            slidesToShow: 2,
	            slidesToScroll: 1,
	            dots: true,
	            arrows: false
	          }
	        }]
	    });
	    setTimeout(function(){ $('.home__shelf .container ul.shelf').removeClass('shelf--loading') }, 150);
	    
	}

	function minicartCounter() {
		let counterSession = sessionStorage.getItem('minicartCounter');
		if(counterSession) {
			$('.header__minicart .minicart__counter span').html(counterSession)
		}
	}

	function buyProduct() {
		$('body').on('click', '.shelf__item .shelf__buybutton', function(){
			let _self = $(this);
			let counter = $('.header__minicart .minicart__counter span')
			let quantity = counter.html()
			let newquantity = parseInt(quantity) + 1
			counter.html(newquantity)
			sessionStorage.setItem('minicartCounter', newquantity);

			// simula acao de adicionar ao carrinho
			$(this).addClass('js-loading')
			
	    setTimeout(function(){ 
	    	_self.removeClass('js-loading'); 
	    	_self.after("<span class='shelf__alert'>o produto foi adicionado!</span>")
	    }, 800);
	    setTimeout(function(){ 
	    	$('.shelf__alert').remove(); 
	    }, 3000);
		});
	}
	function newsLetterSend(dados) {
      $.ajax({
        contentType: 'application/json; charset=utf-8',
        type: 'POST',
        url: 'https://corebiz-test.herokuapp.com/api/v1/newsletter',
        data: JSON.stringify(dados)
      }).done(function(data) {
        console.log(data, 'success')
        $('.footer__newsletter').addClass('success')
        $("#newsletter").removeClass('js-loading')
      }).fail(function(xhr, err){
        console.log(err, 'error')
        $("#newsletter").removeClass('js-loading')
      })

	}
	function newsLetterSubmit() {
      $('#newsletter').submit(function(e){
        e.preventDefault();
        $("#newsletter").addClass('js-loading')
    	$("#newsletter input").each(function(){
	        if( !$(this).val() ) {
	            $(this).parent('div').addClass('error');
	            $("#newsletter").removeClass('js-loading')
	        } else {
	          $(this).parent('div').removeClass('error');
		        newsLetterSend({
		          'email': $('#newsletter #email').val(),
		          'name': $('#newsletter #name').val()
		        });
	        } 
	    })
      })
	}

	function newsLetterReset() {
      $('body').on('click', '.newsletter-reset', function(){
      	$('.footer__newsletter').removeClass('success')
      	$("#newsletter input").val('')
      })
	}

	bannerSlick()
	minicartCounter()
	getProducts()
	buyProduct()
	newsLetterSubmit()
	newsLetterReset()
});  



