
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


/* ***************CATALOG ****************/

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
			$('.modal-order .modal-order__description').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, .modal-order').fadeIn('slow');
		})
	});
	
	modal_close('.modal-order');
	
	function validate_form(form_selector) {
		$(form_selector).validate({
			rules: {
				name: {
					required: true,
					minlength: 2,
				},
				email: {
					required: true,
					email: true,
				}	
			},
			messages: {
				name: {
					required: "Введите ваше имя",
					minlength: jQuery.validator.format("Минимум {0} буквы")
				},
				phone: "Введите ваш телефон",
				email: {
				  required: "Введите email для и мы вам напишем",
				  email: "Ваш email должен выглядеть так: name@domain.com"
				}
			}
		});
	}

	validate_form('.consultation .form_consultation');
	validate_form('#consultation_js');
	validate_form('#order');

	/* *******************************_PHONE_MAKSK_********************** */
	$('input[name=phone]').mask("+7(999) 99-99-999", {placeholder: "_"});
	



	/* ****************Отправка EMAIL с сайта *********************/

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