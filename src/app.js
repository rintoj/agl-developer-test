import './app.css'

export class App {

  constructor(config) {
    this.config = config
    this.target = document.getElementById('root')
  }

  render(data) {
    this.target.innerHTML = [
      ...this.renderPets(data.female, 'Male'),
      ...this.renderPets(data.female, 'Female')
    ].join('\n')
  }

  renderPets(pets, type) {
    return [
      '<h2>', type, '</h2>',
      '<ul>',
      ...pets.map(pet => `<li>${pet}</li>`),
      '</ul>'
    ]
  }

  sortByName(data) {
    return Object.keys(data).reduce((object, key) => {
      object[key] = data[key].sort()
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

  fetch() {
    const { api } = this.config
    return window.fetch(api.url, api.options)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(response.statusText)
      })
  }

  showLoader() {
    this.target.innerHTML = '<div class="loader">Loading...</div>'
  }

  showError(error) {
    this.target.innerHTML = `<div class="error">FAILED: ${error.message || 'Something went wrong'}</div>`
  }

  start() {
    Promise.resolve()
      .then(this.showLoader.bind(this))
      .then(this.fetch.bind(this))
      .then(this.categorize.bind(this))
      .then(this.sortByName.bind(this))
      .then(this.render.bind(this))
      .catch(this.showError.bind(this))
  }
}