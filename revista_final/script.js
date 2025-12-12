// script.js - interactividad: lista de noticias, búsqueda, fecha, modo oscuro y comentarios locales
const newsData = [
  {id:1, title:"Resumen: Apertura del noticiero", category:"sociedad", video:"videos/noticia1.mp4", desc:"Introducción y presentación del proyecto."},
  {id:2, title:"Política: Medida local destacada", category:"politica", video:"videos/noticia2.mp4", desc:"Breve nota sobre una medida pública."},
  {id:3, title:"Ciencia: Avance tecnológico", category:"ciencia", video:"videos/noticia3.mp4", desc:"Resumen de un avance científico o tecnológico."},
  {id:4, title:"Deportes: Resultado reciente", category:"deportes", video:"videos/noticia4.mp4", desc:"Resumen deportivo."},
];

function renderNews(list){
  const container = document.getElementById('news-list');
  container.innerHTML = '';
  list.forEach(n=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h4>${n.title}</h4>
      <p class="meta">Sección: ${n.category}</p>
      <p>${n.desc}</p>
      <p><button data-id="${n.id}" class="play-btn">Ver video</button> <a href="categorias/${n.category}.html">Ver más</a></p>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  renderNews(newsData);
  document.getElementById('today').textContent = new Date().toLocaleDateString('es-AR');
  document.getElementById('year').textContent = new Date().getFullYear();

  document.getElementById('news-list').addEventListener('click', e=>{
    if(e.target.matches('.play-btn')){
      const id = Number(e.target.dataset.id);
      const item = newsData.find(n=>n.id===id);
      if(item){
        const player = document.getElementById('video-feature');
        player.querySelector('source').src = item.video;
        player.load();
        player.play();
        document.getElementById('featured-title').textContent = item.title;
      }
    }
  });

  // search
  const search = document.getElementById('search');
  search.addEventListener('input', ()=>{
    const q = search.value.toLowerCase().trim();
    const filtered = newsData.filter(n=> n.title.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q));
    renderNews(filtered);
  });

  // dark mode
  const toggle = document.getElementById('toggle-dark');
  toggle.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
  });
});
