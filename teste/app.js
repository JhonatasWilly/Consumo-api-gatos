// Consumir api de imagens de gatos
const buscarGatinhos = e => {
  e.preventDefault()
  const xhr = new XMLHttpRequest()
  xhr.open('GET', 'https://api.thecatapi.com/v1/images/search?limit=10')
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const cats = JSON.parse(xhr.responseText)
        cats.forEach(cat => {
          const img = document.createElement('img')
          const div = document.createElement('div')
          const p = document.createElement('p')

          p.innerHTML =
            'Id: ' +
            cat.id +
            '<br/>' +
            'Height: ' +
            cat.height +
            '<br/>' +
            'Width: ' +
            cat.width

          img.src = cat.url

          div.classList.add('dsc-img')
          document
            .querySelector('#gatinhos')
            .appendChild(div)
            .appendChild(p)
            .appendChild(img)
        })

        //Remove o resultado da outra api para mostrar apenas o consumo de uma API por vez
        let paiElemento = document.getElementById('logo-marcas')
        let elementoParaExcluir = document.querySelector('ul')

        if (paiElemento && elementoParaExcluir) {
          paiElemento.removeChild(elementoParaExcluir)
        }
      } else {
        alert('Erro na requisição')
      }
    }
  }
  xhr.send()
}
const btnMostrar = document.querySelector('#mostrar-gatinhos')
btnMostrar.addEventListener('click', buscarGatinhos)

// Consumir api de marcas de carros
const getMarcas = () => {
  const tarefas = fetch(
    `https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/master/logos/data.json`
  )

  tarefas
    .then(resposta => resposta.json())
    .then(marcas => {
      const ul = document.createElement('ul')
      marcas.forEach(marca => {
        const li = document.createElement('li')
        const logo = document.createElement('img')

        logo.src = marca.image?.optimized
        logo.alt = marca.name
        li.appendChild(logo)
        ul.appendChild(li)
      })
      let modal = document.querySelector('.modal')
      document.querySelector('#logo-marcas').appendChild(ul)

      //  Evento para chamar o modal
      ul.addEventListener('mouseover', function (event) {
        if (event.toElement.alt) {
          let nameMarca = document.querySelector('#marca')
          nameMarca.innerHTML = event.toElement.alt
          // Obtém as coordenadas do cursor do mouse
          let mouseX = event.clientX
          let mouseY = event.clientY

          // Define a posição do modal
          modal.style.left = 100 + mouseX + 'px'
          modal.style.top = 200 + mouseY + 'px'
          modal.style.display = 'block'
        }
      })

      ul.addEventListener('mouseout', function () {
        modal.style.display = 'none'
      })

      //Remove o resultado da outra api para mostrar apenas o consumo de uma API por vez
      let divPai = document.getElementById('gatinhos')

      while (divPai.firstChild) {
        divPai.removeChild(divPai.firstChild)
      }
    })
    .catch(erro => console.log(erro))
}

const btnMarcas = document.querySelector('#marcas')
btnMarcas.addEventListener('click', getMarcas)
