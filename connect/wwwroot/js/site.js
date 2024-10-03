(function () {
    "use strict";

    /**
     * Apply .scrolled class to the body as the page is scrolled down.
     */
    function toggleScrolled() {
        const body = document.querySelector('body');
        const header = document.querySelector('#header');
        const isHeaderSticky = header.classList.contains('scroll-up-sticky') ||
            header.classList.contains('sticky-top') ||
            header.classList.contains('fixed-top');

        if (!isHeaderSticky) return;

        body.classList.toggle('scrolled', window.scrollY > 100);
    }

    document.addEventListener('scroll', toggleScrolled);
    window.addEventListener('load', toggleScrolled);

    /**
     * Mobile navigation toggle.
     */
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

    function toggleMobileNav() {
        document.body.classList.toggle('mobile-nav-active');
        mobileNavToggleBtn.classList.toggle('bi-list');
        mobileNavToggleBtn.classList.toggle('bi-x');
    }

    mobileNavToggleBtn.addEventListener('click', toggleMobileNav);

    /**
     * Hide mobile nav on same-page/hash links.
     */
    document.querySelectorAll('#navmenu a').forEach(navItem => {
        navItem.addEventListener('click', () => {
            if (document.body.classList.contains('mobile-nav-active')) {
                toggleMobileNav();
            }
        });
    });

    /**
     * Toggle mobile nav dropdowns.
     */
    document.querySelectorAll('.navmenu .toggle-dropdown').forEach(dropdownToggle => {
        dropdownToggle.addEventListener('click', function (e) {
            e.preventDefault();
            const parentItem = this.parentNode;
            parentItem.classList.toggle('active');
            parentItem.nextElementSibling.classList.toggle('dropdown-active');
            e.stopImmediatePropagation();
        });
    });

    /**
     * Preloader handling.
     */
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove();
        });
    }

    /**
     * Scroll to top button functionality.
     */
    const scrollTopBtn = document.querySelector('.scroll-top');

    function toggleScrollTopButton() {
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('active', window.scrollY > 100);
        }
    }

    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('load', toggleScrollTopButton);
    document.addEventListener('scroll', toggleScrollTopButton);

    /**
     * Smooth scroll for navigation links.
     */
    document.querySelectorAll('a.scroll-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    /**
     * Tooltip functionality.
     */
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        element.addEventListener('mouseenter', function () {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.innerText = tooltipText;
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight}px`;
            tooltip.style.left = `${rect.left + (this.offsetWidth / 2) - (tooltip.offsetWidth / 2)}px`;

            this._tooltip = tooltip; // Store tooltip reference for removal later
        });

        element.addEventListener('mouseleave', function () {
            if (this._tooltip) {
                this._tooltip.remove();
                delete this._tooltip; // Remove reference
            }
        });
    });
})();
