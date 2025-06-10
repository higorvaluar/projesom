const form = document.getElementById('mediaForm');
const gallery = document.getElementById('gallery');

let mediaList = JSON.parse(localStorage.getItem('mediaList')) || [];

function renderGallery() {
  gallery.innerHTML = '';
  mediaList.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'item';

    let media;
    if (item.type.startsWith('image/')) {
      media = document.createElement('img');
      media.src = item.dataUrl;
    } else {
      media = document.createElement('video');
      media.src = item.dataUrl;
      media.controls = true;
    }
    div.appendChild(media);

    // Cria a div content
    const content = document.createElement('div');
    content.className = 'content';

    const title = document.createElement('h3');
    title.textContent = item.title;

    const desc = document.createElement('p');
    desc.textContent = item.description;

    const buttons = document.createElement('div');
    buttons.className = 'buttons';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.onclick = () => editItem(index);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Excluir';
    delBtn.onclick = () => deleteItem(index);

    buttons.appendChild(editBtn);
    buttons.appendChild(delBtn);

    content.appendChild(title);
    content.appendChild(desc);
    content.appendChild(buttons);

    div.appendChild(content);

    gallery.appendChild(div);
  });
}

function addItem(file, title, description) {
  const reader = new FileReader();
  reader.onload = function(e) {
    mediaList.push({
      dataUrl: e.target.result,
      title,
      description,
      type: file.type
    });
    updateStorage();
    renderGallery();
  }
  reader.readAsDataURL(file);
}

function editItem(index) {
  const newTitle = prompt('Novo título:', mediaList[index].title);
  const newDesc = prompt('Nova descrição:', mediaList[index].description);
  if (newTitle && newDesc) {
    mediaList[index].title = newTitle;
    mediaList[index].description = newDesc;
    updateStorage();
  }
}

function deleteItem(index) {
  if (confirm('Tem certeza que quer excluir?')) {
    mediaList.splice(index, 1);
    updateStorage();
  }
}

function updateStorage() {
  localStorage.setItem('mediaList', JSON.stringify(mediaList));
  renderGallery();
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const file = document.getElementById('mediaFile').files[0];
  const title = document.getElementById('mediaTitle').value;
  const description = document.getElementById('mediaDesc').value;
  if (file) {
    addItem(file, title, description);
    form.reset();
  }
});

renderGallery();

const mediaFileInput = document.getElementById('mediaFile');
const fileNameSpan = document.getElementById('fileName');

mediaFileInput.addEventListener('change', function () {
  const fileName = mediaFileInput.files[0]?.name || "Nenhum arquivo escolhido";
  fileNameSpan.textContent = fileName;
});