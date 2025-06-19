function showPage(pageId) {
    // Hide all sections with the 'page' class
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });

    // Show the requested page
    let activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.style.display = 'block';
    } else {
        console.error(`Element with ID '${pageId}' not found.`);
    }
}

// Event listeners
document.getElementById('get-started').addEventListener('click', () => showPage('weather-page'));
document.getElementById('home').addEventListener('click', () => showPage('intro-page'));
document.getElementById('home1').addEventListener('click', () => showPage('intro-page'));
document.getElementById('about1').addEventListener('click', () => showPage('abt'));
document.getElementById('about2').addEventListener('click', () => showPage('abt'));
