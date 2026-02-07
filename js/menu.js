const currentPath = document.location.pathname;

console.log("Текущий путь: " + currentPath);

if (currentPath.includes('fondBook.html')) {
    document.getElementById('menu-all-books').classList.add('active');
} else if (currentPath.includes('booking.html')) {
    document.getElementById('menu-my-bookings').classList.add('active');
} else if (currentPath.includes('history.html')) {
    document.getElementById('menu-history').classList.add('active');
} else if (currentPath.includes('profile.html')) {
    document.getElementById('menu-profile').classList.add('active');
}