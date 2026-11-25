const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = carouselTrack ? [...carouselTrack.children] : [];
let carouselIndex = 0;
function visibleSlides() { return window.matchMedia('(max-width: 680px)').matches ? 1 : 3; }
function updateCarousel() {
  if (!carouselTrack || !carouselItems.length) return;
  const maxIndex = Math.max(0, carouselItems.length - visibleSlides());
  carouselIndex = Math.min(carouselIndex, maxIndex);
  carouselTrack.style.transform = `translateX(-${carouselIndex * (100 / visibleSlides())}%)`;
}
document.querySelector('.carousel-btn.next')?.addEventListener('click', () => {
  carouselIndex = carouselIndex >= carouselItems.length - visibleSlides() ? 0 : carouselIndex + 1;
  updateCarousel();
});
document.querySelector('.carousel-btn.prev')?.addEventListener('click', () => {
  carouselIndex = carouselIndex <= 0 ? Math.max(0, carouselItems.length - visibleSlides()) : carouselIndex - 1;
  updateCarousel();
});
window.addEventListener('resize', updateCarousel);
updateCarousel();
