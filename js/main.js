// Navigation underline follows scroll
const navLinks = document.querySelectorAll('.nav-link.nav-underline');
const sections = ['menu', 'about', 'contact'];
window.addEventListener('scroll', () => {
    let found = false;
    sections.forEach((id, i) => {
        const section = document.getElementById(id);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 90 && rect.bottom >= 90) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLinks[i].classList.add('active');
                found = true;
            }
        }
    });
    if (!found) navLinks.forEach(link => link.classList.remove('active'));
});

// Smooth scroll for nav
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({behavior: 'smooth'});
        }
    });
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
});

// Ripple effect for menu cards
document.querySelectorAll('.menu-card.ripple').forEach(card => {
    card.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = (e.clientX - card.getBoundingClientRect().left) + 'px';
        ripple.style.top = (e.clientY - card.getBoundingClientRect().top) + 'px';
        card.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
    });
});

// Section reveal on scroll
const observerOptions = {
    threshold: 0.18
};
const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('section-hidden');
            entry.target.classList.add('section-visible');
            obs.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach((section, idx) => {
    section.classList.add('section-hidden');
    revealObserver.observe(section);
});

// --------- Image Zoom Modal --------- //
const modal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const captionText = document.getElementById('imgCaption');
const closeModalBtn = document.querySelector('.close-modal');

// Utility to get alt text for caption
function getImgCaption(imgElem) {
    return imgElem.getAttribute('alt') || '';
}

// Attach click listeners to all .zoomable and their contained img
document.querySelectorAll('.zoomable').forEach(container => {
    container.addEventListener('click', function(e) {
        let imgElem = this.querySelector('img');
        if (!imgElem) return;
        modal.style.display = "block";
        modalImg.src = container.getAttribute('data-img');
        captionText.innerHTML = getImgCaption(imgElem);
        document.body.style.overflow = "hidden";
    });
});

// Also attach to all .card-img-container
document.querySelectorAll('.card-img-container').forEach(container => {
    container.addEventListener('click', function(e) {
        e.stopPropagation();
        let imgElem = this.querySelector('img');
        if (!imgElem) return;
        modal.style.display = "block";
        modalImg.src = container.getAttribute('data-img');
        captionText.innerHTML = getImgCaption(imgElem);
        document.body.style.overflow = "hidden";
    });
});

// Also attach to contact image container
document.querySelectorAll('.contact-img-container').forEach(container => {
    container.addEventListener('click', function(e) {
        let imgElem = this.querySelector('img');
        if (!imgElem) return;
        modal.style.display = "block";
        modalImg.src = container.getAttribute('data-img');
        captionText.innerHTML = getImgCaption(imgElem);
        document.body.style.overflow = "hidden";
    });
});

// Close modal on X click
closeModalBtn.onclick = function() {
    modal.style.display = "none";
    modalImg.src = "";
    captionText.innerHTML = "";
    document.body.style.overflow = "";
};

// Close modal if click outside image
modal.onclick = function(e) {
    if (e.target === modal) {
        modal.style.display = "none";
        modalImg.src = "";
        captionText.innerHTML = "";
        document.body.style.overflow = "";
    }
};

// Close modal with ESC key
document.addEventListener('keydown', function(e){
    if (e.key === "Escape" && modal.style.display === "block") {
        modal.style.display = "none";
        modalImg.src = "";
        captionText.innerHTML = "";
        document.body.style.overflow = "";
    }
});