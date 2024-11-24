// Toggle & Responsive Navigation
const navSlide = () => {
    const burger = document.querySelector(".burger")
    const navList = document.querySelector("nav")

    burger.addEventListener("click", () =>{
        navList.classList.toggle("nav-active")
        burger.classList.toggle("toggle-burger")
    })
};
navSlide();

//clear form before unload
window.onbeforeunload = () => {
    for (const form of document.getElementsByTagName("form")) {
        form.reset();
    }
};

// TombolUp
const scrollToTopButton = document.getElementById("tombolUp");

// Tampilkan tombol ketika halaman di-scroll lebih dari 100px
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
});

// Fungsi untuk kembali ke atas
scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth", // Memberikan efek scroll yang halus
    });
});