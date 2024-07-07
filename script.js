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

    const container = document.querySelector('.scrollable-container');
    const wrapper = document.querySelector('.gif-wrapper');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cardWidth = 320;
    let scrollPosition = 0;
    let scrollInterval;

    function scrollGifs(direction) {
        const maxScroll = wrapper.scrollWidth - container.clientWidth;
        scrollPosition += direction * cardWidth;
        if (scrollPosition >= maxScroll) {
            scrollPosition = 0;
        }
        if (scrollPosition < 0) {
            scrollPosition = maxScroll;
        }
        wrapper.style.transform = `translateX(-${scrollPosition}px)`;
    }

    function startAutoScroll() {
        if (!container) return;
        
        scrollInterval = setInterval(() => {
            scrollPosition += 2;
            if (scrollPosition >= wrapper.scrollWidth - container.clientWidth) {
                scrollPosition = 0;
            }
            wrapper.style.transform = `translateX(-${scrollPosition}px)`;
        }, 30);
    }

    function stopAutoScroll() {
        clearInterval(scrollInterval);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoScroll();
            scrollGifs(-1);
        });
        nextBtn.addEventListener('click', () => {
            stopAutoScroll();
            scrollGifs(1);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoScroll();
            scrollGifs(-1);
        }
        if (e.key === 'ArrowRight') {
            stopAutoScroll();
            scrollGifs(1);
        }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    if (container) {
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoScroll();
        });

        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) scrollGifs(1);
            if (touchEndX - touchStartX > 50) scrollGifs(-1);
        });

        container.addEventListener('mouseenter', stopAutoScroll);
        container.addEventListener('mouseleave', startAutoScroll);
    }

    startAutoScroll();
    reveal();
});
