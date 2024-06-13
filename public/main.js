const form = document.getElementById('form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  
  const url = document.getElementById('urlInput').value;
  console.log(url)
  
  fetch('/', {
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
      const card = document.getElementById('card');
      const newData = data;

      card.innerHTML = `
          <h2>${newData.title}</h2>
          <p>${newData.description}</p>
          <img src="${newData.images[0]}" alt="Vista Previa de la Imagen">
          <a href="${newData.url}">${newData.url}</a>
      `;
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Error con la vista previa');
  });
})