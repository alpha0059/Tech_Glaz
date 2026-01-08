{ //background video section

    let video = document.getElementById("bg_video");
    const startTime = 4;
    const endTime = 20;

    video.currentTime = startTime;

    video.addEventListener("timeupdate", () => {
        if (video.currentTime >= endTime) {

            video.currentTime = startTime;
            video.play();

        }
    })

}

//header section

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menuButton');
    const menuDropdown = document.getElementById('menuDropdown');

    if (!menuButton || !menuDropdown) return;

    const closeMenu = () => {
        menuDropdown.classList.remove('show');
        menuDropdown.setAttribute('aria-hidden', 'true');
    };

    const openMenu = () => {
        menuDropdown.classList.add('show');
        menuDropdown.setAttribute('aria-hidden', 'false');
    };

    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        if (menuDropdown.classList.contains('show')) closeMenu(); else openMenu();
    });

    document.addEventListener('click', (e) => {
        if (!menuDropdown.contains(e.target) && e.target !== menuButton && !menuButton.contains(e.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
});

// Initialize Swiper for Projects slider (if Swiper is loaded)
try {
    if (typeof Swiper !== 'undefined') {
        new Swiper('.mySwiper', {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }
} catch (e) {
    console.warn('Swiper init failed:', e);
}

//about section


// project section

var swiper = new Swiper(".mySwiper", {
    spaceBetween: 25,
    garbCursor: true,
    loop: true,
    clickable: true,
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
    breakpoints: {
        450: {
            slidesPerView: 1.5,
        },
        768: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
    }
});