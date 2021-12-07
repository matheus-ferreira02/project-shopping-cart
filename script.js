const createElementHTML = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

const addLoadText = () => {
  const main = document.querySelector('.items');
  const p = createElementHTML('p', 'loading', 'Carregando ....');
  main.appendChild(p);
}

const removeLoadText = () => {
  const loadText = document.querySelector('.loading');
  loadText.remove();
}

const createImageElement = (imageSrc, classImage) => {
  const img = document.createElement('img');
  img.className = classImage;
  img.src = imageSrc;
  return img;
}

const createProductItemElement = ({id, title, thumbnail, price}) => {
  const div = document.createElement('div');
  div.className = 'item';

  div.appendChild(createElementHTML('span', 'item__id', id));
  div.appendChild(createElementHTML('span', 'item__title', title));
  div.appendChild(createImageElement(thumbnail, 'item__image'));
  div.appendChild(createElementHTML('span', 'item__price', `R$ ${price.toFixed(2)}`));
  div.appendChild(createElementHTML('button', 'item__add', 'Adicionar ao carrinho!'));

  return div
}

const showProducts = (data) => {
  const main = document.querySelector('.items');
  data.forEach((element) => {
    main.appendChild(createProductItemElement(element));
  })
}

const createButtonIcon = (price) => {
  const icon = createElementHTML('i', 'ti ti-trash', '');

  const className = 'remove-product';
  const button = createElementHTML('button', className, '');
  button.type = 'button';
  button.id = price
  button.appendChild(icon);
  return button;
}

const removeItem = (event) => {
  let item;
  const target = event.target.parentNode.parentNode;
  if (target.className === 'price-trash') {
    item = target.parentNode;
  } else {
    item = target;
  }
  const price = item.lastChild.lastChild.id;
  totalPrice(-price);
  item.remove();
}

const createCartItemElement = ({ id, title, price, thumbnail }) => {
  const li = document.createElement('li');
  li.id = id;
  li.className = 'cart__item';

  const titleText = createElementHTML('p', 'title__cart', title);
  const priceText = createElementHTML('p', 'price__cart', `R$ ${price.toFixed(2)}`);
  const button = createButtonIcon(price);
  button.addEventListener('click', removeItem);
  const div = createElementHTML('div', 'price-trash', '');
  
  li.appendChild(createImageElement(thumbnail, 'image__cart'));

  li.appendChild(titleText);
  div.appendChild(priceText);
  div.appendChild(button);
  li.appendChild(div);

  return li;
}

let total = 0;
const totalPrice = (price) => {
  const totalElement = document.querySelector('.total-price');
  total += price;
  if (total < 0) {
    totalElement.innerText = 'R$ 0.00';
  } else {
    totalElement.innerText = `TOTAL: R$ ${total.toFixed(2)}`;
  }
}

const addItemCart = ((data) => {
  const ul = document.querySelector('.cart__items');
  ul.appendChild(createCartItemElement(data));
  totalPrice(data.price);
})

const verifyItem = (data) => {
  const liItems = document.querySelectorAll('.cart__item');
  if (liItems.length === 0) {
    addItemCart(data);
  } else {
    const ids = Object.values(liItems).map(({ id }) => id);
    if (!ids.includes(data.id)) addItemCart(data);
  }
}

const eventAddCart = () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const idProduct = event.target.parentNode.firstChild;
      const data = await fetchItem(idProduct.innerText);
      verifyItem(data);
    })
  })
}

window.onload = async () => {
  addLoadText();
  const data = await fetchProducts('computador');
  removeLoadText();
  showProducts(data);
  eventAddCart();
}
