const form = document.getElementById('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const url = document.getElementById('urlInput').value;
  console.log(url)
  
  fetch('/preview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: url
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
      savePreviewData(data);
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Error con la vista previa');
  });
})

const blogsSection = document.getElementById('blogsSection');
const previewData = [];

// Guardar los datos de previsualización de los links

function savePreviewData(data) {
  
  const preview = {
    title: data.title,
    description: data.description,
    image: data.images[0],
    url: data.url,
  }

  previewData.push(preview);

  console.log(previewData);

  // Creación de elementos de la card

  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  const imgContainer = document.createElement('picture');
  imgContainer.classList.add('card__img-container');
  
  const img = document.createElement('img');
  img.classList.add('card__img');
  img.src = preview.image;
  imgContainer.appendChild(img);

  const descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('card__description');

  const title = document.createElement('p');
  title.classList.add('card__title');
  title.textContent = preview.title;

  const date = document.createElement('p');
  date.classList.add('card__date');
  date.textContent = preview.date;

  const description = document.createElement('p');
  description.classList.add('card__paragraph');
  description.textContent = preview.text;

  const cardBtn = document.createElement('a');
  cardBtn.classList.add('card__btn');
  cardBtn.textContent = "leer";
  cardBtn.href = preview.url;

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('card__btn-delete');
  deleteBtn.type = "button";
  deleteBtn.textContent = "Eliminar";

  descriptionContainer.append(title, date, description, cardBtn, deleteBtn);
  cardDiv.append(imgContainer, descriptionContainer);

  blogsSection.appendChild(cardDiv);
}

document.addEventListener('DOMContentLoaded', function (event) {

  blogsSection.addEventListener('click', function (event) {
    
    if (event.target && event.target.classList.contains('card__btn-delete')) {
      deletePreviewCard(event);
    }
      
  });
})

// Eliminar card

function deletePreviewCard(event) {
    console.log(event.target)
    const card = event.target.closest('.card');
    if (card) {
      card.remove();
    }
}