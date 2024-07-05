$(document).ready(function(){
  $('a[href^="#"]').on('click', function(e) {
      e.preventDefault();
      let target = this.hash;
      let $target = $(target);
      
      if ($target.length) {
          $('html, body').animate({
              scrollTop: $target.offset().top
          }, 500);
      }
  });
});

window.addEventListener('scroll', reveal);

function reveal() {
  let reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(function(reveal){
      let windowHeight = window.innerHeight;
      let revealTop = reveal.getBoundingClientRect().top;
      let revealPoint = 150;
      
      if (revealTop < windowHeight - revealPoint) {
          reveal.style.opacity = 1;
          reveal.style.transform = 'translateY(0)';
      } else {
          reveal.style.opacity = 0;
          reveal.style.transform = 'translateY(-20px)';
      }
  });
}

$(document).ready(function() {
  $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
          $('#goTopButton').fadeIn();
      } else {
          $('#goTopButton').fadeOut();
      }
  });

  $('#goTopButton').click(function(e) {
      e.preventDefault();
      $('html, body').animate({scrollTop: 0}, 300);
  });
});
