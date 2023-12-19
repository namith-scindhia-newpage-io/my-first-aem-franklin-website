import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  block.classList.add('d-flex', 'flex-column', 'flex-lg-row');

  [...block.children].forEach((row) => {
    row.classList.add('d-flex', 'p-3', 'align-items-center');
    const children = [...row.children];

    const pictureDiv = children[0];
    const titleDiv = children[1];
    const link = children[2];
    const colorCode = children[3];

    pictureDiv.classList.add('flex-shrink-0');
    pictureDiv
      .querySelectorAll('img')
      .forEach((img) =>
        img
          .closest('picture')
          .replaceWith(
            createOptimizedPicture(img.src, img.alt, false, [{ width: '110' }])
          )
      );

    const triangle1 = document.createElement('div');
    triangle1.classList.add('triangle', 'ms-1', 'me-1');
    triangle1.style['border-left-color'] = colorCode.getInnerHTML();

    const triangle2 = document.createElement('div');
    triangle2.classList.add('triangle');
    triangle2.style['border-left-color'] = colorCode.getInnerHTML();

    const anchor = document.createElement('a');
    anchor.classList.add('title');
    anchor.setAttribute('href', link.getInnerHTML());
    anchor.innerHTML = titleDiv.getInnerHTML();

    const divContainer = document.createElement('div');
    divContainer.classList.add('ms-3');
    divContainer.append(anchor);

    divContainer.append(triangle1);
    divContainer.append(triangle2);

    titleDiv.replaceWith(divContainer);
    link.remove();
    colorCode.remove();

    const divhr = document.createElement('div');
    divhr.classList.add('divhr', 'mx-lg-4');

    row.after(divhr);
  });
}
