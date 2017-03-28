import './app.css'

export class App {

  constructor(config) {
    this.config = config
  }

  render(data) {
    if (data == undefined) return []
    return [
      ...this.renderPets(data.male, 'Male'),
      ...this.renderPets(data.female, 'Female')
    ]
  }

  renderPets(pets, type) {
    if (pets == undefined || type == undefined || type === '') return []
    const petsHtml = pets.length > 0 ? pets.map(pet => `<li>${pet}</li>`) : ['<li>No Pets</li>']
    return [
      `<h2>${type}</h2>`,
      '<ul>',
      ...petsHtml,
      '</ul>'
    ]
  }

  sortByName(data) {
    if (data == undefined) return
    return Object.keys(data).reduce((object, key) => {
      object[key] = (data[key] || []).sort()
      return object;
    }, {})
  }

  categorize(data) {
    return data.reduce((petsByGender, item) => {
      const key = item.gender.toLowerCase()
      petsByGender[key] = (petsByGender[key] || []).concat(
        (item.pets || []).filter(pet => pet.type === 'Cat')
        .map(pet => pet.name)
      )
      return petsByGender
    }, {})
  }

  fetch(api) {
    return window.fetch(api.url + '', api.options)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(response.statusText)
      })
  }

  renderLoader() {
    return ['<div class="loader">Loading...</div>']
  }

  renderError(error) {
    console.error(error)
    return [`<div class="error">FAILED: ${error.message || 'Something went wrong'}</div>`]
  }

  start() {
    const target = document.getElementById('root')
    Promise.resolve()
      .then(this.renderLoader)
      .then(loader => target.innerHTML = loader.join('\n'))
      .then(this.fetch.bind(this, this.config.api))
      .then(this.categorize)
      .then(this.sortByName)
      .then(this.render.bind(this))
      .catch(this.renderError)
      .then(html => target.innerHTML = html.join('\n'))
  }
}