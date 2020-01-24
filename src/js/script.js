
/* slick - slider на JQuery */

$(document).ready(function(){
	$('.corusel__inner').slick({
		infinite: true,
		speed: 1300,
		autoplay: true,
		autoplaySpeed: 2000,
		arrows: true,
		prevArrow: '<button type="button" class="prev"></button>',
		nextArrow: '<button type="button" class="next"></button>',
		adaptiveHeight: false,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: false,
					dots: true,
				}
			}
		],
	})
	
});

$(document).ready(function(){
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

/* 
Этот код дальше оптимизирован через функцию, 
чтоб не копипастить а только менять(подставлять) классы

  $('.catalog-item__link').each(function(i) {
    $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    });
  });

  $('.catalog-item__back').each(function(i) {
    $(this).on('click', function(e) {
      e.preventDefault();
      $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    });
  }); 
  */

	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');




							/* 
							tiny slider with rpev and next buttons
							const slider = tns({
								container: '.corusel__inner',
								items: 1,
								slideBy: 'page',
								autoplay: true,
								nav: false,
								controls: false,
								autoplay: false,
							});

							document.querySelector('.prev').addEventListener('click', function () {
								slider.goTo('prev');
							}); 

							document.querySelector('.next').addEventListener('click', function () {
								slider.goTo('next');
							}); 
							*/

/*****************  popUp modal *******************/
	function modal_close(modal) {
		$('.modal__close').on('click', function() {
			$('.overlay').fadeOut('slow')
			$(modal).fadeOut('slow')
		});
	};

	//take consultation PopUp
	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn('slow')
	});
	modal_close('#consultation');

	/*take order PopUp *********************/  


/* 	$('[data-modal=order]').on('click', function() {
		$('.overlay, #order').fadeIn('slow')
	}); */

	$('.button_mini').each(function(i){
		$(this).on('click', function() {
			$('#order .modal-order__description').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		})
	});
	
	modal_close('#order');
	
/***************** Mask form with JQuery mask input *******************/

	$('input[name=phone]').mask("+7(999) 999-9999",{placeholder:"_"});

/***************** Validate form with JQuery validate *******************/

	
	function validateForm(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: 'required',
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: "Введите своё имя",
				phone: "Введите ваш телефон",
				email: {
					required: "Введите ваше e-mail",
					email: "Формат e-mail должен быть: name@domain.com"
				}
			}
		});	
	}
	
	validateForm('.form_consultation'); 
	validateForm('#consultation form');  
	validateForm('#order form');  

/***************** Send e-mail from site with PHP Mailer *******************/


	$('form').submit(function(e){
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: 'mailer/smart.php',
			data: $(this).serialize()
		}).done (function() {
			$(this).find('input').val("");
			$('#consultation, #js_order').fadeOut('slow');
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});

});