const menu = document.querySelector('.menu-icon');
const items = document.querySelector('.menu-items');

menu.addEventListener('click', (e) => {
  items.classList.toggle('show-nav');
  if (items.className.includes('show-nav')) {
    menu.innerHTML = `<svg
  xmlns="http://www.w3.org/2000/svg"
  class="svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M6 18L18 6M6 6l12 12"
  />
</svg>`;
  } else {
    menu.innerHTML = `<svg
  xmlns="http://www.w3.org/2000/svg"
  class="svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M4 6h16M4 12h16M4 18h16"
  />
</svg>`;
  }
});
