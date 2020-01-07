
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
	}
);

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

});


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

