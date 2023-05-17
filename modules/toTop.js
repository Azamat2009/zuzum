//slide to top
const backToTopBtn = document.querySelector('#back-to-top-btn');


window.addEventListener('scroll', () => {
  if (window.pageYOffset > 0) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }

  if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
    backToTopBtn.style.bottom = '80px';
  } else {
    backToTopBtn.style.bottom = '20px';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});