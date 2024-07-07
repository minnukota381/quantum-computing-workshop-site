document.addEventListener('DOMContentLoaded', function() {

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

    window.addEventListener('scroll', reveal);

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

    let scrollInterval;

    function startAutoScroll() {
        const container = document.querySelector('.scrollable-container');
        if (!container) return;
        
        scrollInterval = setInterval(() => {
            container.scrollLeft += 2;
        }, 10);
    }

    function stopAutoScroll() {
        clearInterval(scrollInterval);
    }

    startAutoScroll();

    const container = document.querySelector('.scrollable-container');
    if (container) {
        container.addEventListener('mouseenter', stopAutoScroll);
        container.addEventListener('mouseleave', startAutoScroll);
    }

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            container.scrollLeft -= 300; 
        });

        nextBtn.addEventListener('click', () => {
            container.scrollLeft += 300;
        });
    }
});
