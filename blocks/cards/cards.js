import { createOptimizedPicture, fetchPlaceholders } from '../../scripts/aem.js';

export default async function decorate(block) {
  const placeholders = await fetchPlaceholders('');
  const { clickHereForMore } = placeholders;
  /* Change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
        const paragraphs = div.querySelectorAll('p');
        if (paragraphs.length > 1) {
          const secondParagraph = paragraphs[1];
          secondParagraph.style.display = 'none'; // Hide second <p> initially
          const placeholderLink = document.createElement('a');
          placeholderLink.innerText = clickHereForMore || 'Click here for more';
          placeholderLink.href = '#';
          placeholderLink.style.cursor = 'pointer';
          secondParagraph.before(placeholderLink);
          placeholderLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default anchor behavior
            if (secondParagraph.style.display === 'none') {
              secondParagraph.style.display = 'block';
            } else {
              secondParagraph.style.display = 'none';
            }
          });
        }
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
