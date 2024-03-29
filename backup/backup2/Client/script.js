document.addEventListener("DOMContentLoaded", function() {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all navbar items
            navItems.forEach(item => {
                item.classList.remove('active');
            });

            // Add active class to the clicked navbar item
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            fetchData(category);
        });
    });
});
