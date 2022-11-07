import { createElem } from '../../scripts/utils.js';

function toLowerDash(text) {
  const edgesCheck = /(?:^[^a-z]+|[^a-z]+$)/g;
  const check = /[^a-z]+/g;
  const moddedText = text.toLowerCase().replaceAll(edgesCheck, '').replaceAll(check, '-');

  return moddedText;
}

const handleFormSubmission = async (evt) => {
  evt.preventDefault();

  evt.target.closest('input[type="submit"]').disabled = '';

  const form = evt.target.closest('form');

  const payload = {};
  [...form.elements].forEach((fe) => {
    if (fe.type === 'checkbox') {
      if (fe.checked) payload[fe.id] = fe.value;
    } else if (fe.id) {
      payload[fe.id] = fe.value;
    }
  });

  const resp = await fetch(form.action, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: payload }),
  });

  await resp.text();

  if (await resp.ok) {
    const thankYouEl = createElem('div', 'thank-you-message');
    thankYouEl.innerText = form.dataset.thankYouMessage;

    form.innerHTML = '';
    form.append(thankYouEl);
  }

  return payload;
};

function addFormElem(type, label, id) {
  const itemContainerEl = createElem('div', 'form-item');

  const elName = (type === 'textarea' ? 'textarea' : 'input');
  const formItemEl = createElem(elName);

  if (type !== 'textarea') {
    formItemEl.setAttribute('type', type);
  }

  if (type === 'submit') {
    itemContainerEl.classList.add('submit-container');
    formItemEl.value = label;
  } else {
    const labelEl = createElem('label');
    labelEl.setAttribute('for', toLowerDash(label));
    labelEl.innerText = label;
    itemContainerEl.append(labelEl);
  }

  if (id) {
    formItemEl.id = id;
  }

  formItemEl.setAttribute('name', toLowerDash(label));

  if (type === 'submit') {
    formItemEl.addEventListener('click', handleFormSubmission);
  }

  itemContainerEl.append(formItemEl);

  return itemContainerEl;
}

export default function decorate(block) {
  const thankYouMessage = block.querySelector(':scope > div:nth-child(2) > div');

  const formEl = createElem('form');
  formEl.setAttribute('action', block.querySelector(':scope > div:first-child a')?.href);
  formEl.dataset.thankYouMessage = thankYouMessage.innerText;

  formEl.append(addFormElem('text', 'Your Name', 'name'));
  formEl.append(addFormElem('textarea', 'Your Gripe', 'gripe'));
  formEl.append(addFormElem('submit', 'Submit'));

  block.innerHTML = '';
  block.append(formEl);
}
