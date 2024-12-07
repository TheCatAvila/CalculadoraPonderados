function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const button = document.querySelector('.dark-mode-toggle');

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        button.innerHTML = '<i class="bi bi-moon-stars"></i> Dark mode';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        button.innerHTML = '<i class="bi bi-sun"></i> Light mode';
    }
}
