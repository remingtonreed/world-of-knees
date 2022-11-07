import { createElem } from '../../scripts/utils.js';

function buildGripeListEl(data) {
  const gripeListingEl = createElem('div', 'gripe-listing-container');
  data.forEach((submission) => {
    const gripeItemEl = createElem('div', 'gripe-item');
    const nameEl = createElem('p', 'gripe-users-name');
    nameEl.innerText = submission.name;
    const gripeEl = createElem('p', 'gripe-users-gripe');
    gripeEl.innerText = submission.gripe;
    gripeItemEl.append(nameEl, gripeEl);

    gripeListingEl.append(gripeItemEl);
  });

  return gripeListingEl;
}

async function getList(path) {
  const resp = await fetch(path);

  if (resp.ok) {
    const json = await resp.json();
    return json?.data;
  }

  return null;
}

export default async function decorate(block) {
  const refAnchor = block.querySelector('a');
  block.innerHTML = '';

  const fetchPath = refAnchor?.href;

  if (fetchPath) {
    const gripeList = await getList(fetchPath);

    if (gripeList) {
      const gripeListEl = buildGripeListEl(gripeList);

      block.append(gripeListEl);
    }
  }
}
