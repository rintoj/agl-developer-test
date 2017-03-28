import 'babel-polyfill'

import {
  App,
} from '../src/app'
import {
  expect,
} from 'chai'

const conf = {
  api: {}
}

describe('App', () => {
  let app

  beforeEach(() => app = new App(conf))

  describe('render', () => {
    it('should return an array of html tags with given pets by gender names', () => {
      const result = app.render({
        male: ['Garfield', 'Tom', 'Nemo'],
        female: ['Sam', 'Max']
      })

      expect(result).be.a('array')
      expect(result).be.length(11)
      expect(result[0]).be.equal('<h2>Male</h2>')
      expect(result[1]).be.equal('<ul>')
      expect(result[2]).be.equal('<li>Garfield</li>')
      expect(result[3]).be.equal('<li>Tom</li>')
      expect(result[4]).be.equal('<li>Nemo</li>')
      expect(result[5]).be.equal('</ul>')
      expect(result[6]).be.equal('<h2>Female</h2>')
      expect(result[7]).be.equal('<ul>')
      expect(result[8]).be.equal('<li>Sam</li>')
      expect(result[9]).be.equal('<li>Max</li>')
      expect(result[10]).be.equal('</ul>')

    })

    it('should return an empty array if data is undefined', () => {
      const result = app.render(undefined)
      expect(result).be.a('array')
      expect(result).be.empty
    })
  })

  describe('renderPets', () => {
    it('should return an array of html tags with given pets and type', () => {
      const result = app.renderPets(['Garfield', 'Tom', 'Nemo'], 'Male')
      expect(result).be.a('array')
      expect(result).be.length(6)
      expect(result[0]).be.equal('<h2>Male</h2>')
      expect(result[1]).be.equal('<ul>')
      expect(result[2]).be.equal('<li>Garfield</li>')
      expect(result[3]).be.equal('<li>Tom</li>')
      expect(result[4]).be.equal('<li>Nemo</li>')
      expect(result[5]).be.equal('</ul>')
    })

    it('should return an empty array if pets array is undefined', () => {
      const result = app.renderPets(undefined, 'Male')
      expect(result).be.a('array')
      expect(result).be.empty
    })

    it('should return an empty array if type is undefined', () => {
      const result = app.renderPets(['Garfield', 'Tom', 'Nemo'], undefined)
      expect(result).be.a('array')
      expect(result).be.empty
    })

    it('should return an empty array if type is empty string', () => {
      const result = app.renderPets(['Garfield', 'Tom', 'Nemo'], '')
      expect(result).be.a('array')
      expect(result).be.empty
    })

    it('should return array with "No Pets" message if pets array is empty', () => {
      const result = app.renderPets([], 'Male')
      expect(result).be.a('array')
      expect(result).be.length(4)
      expect(result[0]).be.equal('<h2>Male</h2>')
      expect(result[1]).be.equal('<ul>')
      expect(result[2]).be.equal('<li>No Pets</li>')
      expect(result[3]).be.equal('</ul>')
    })
  })

  describe('sortByName', () => {
    it('should sort the given array of pets for males and females', () => {
      const result = app.sortByName({
        male: ['Garfield', 'Tom', 'Nemo'],
        female: ['Sam', 'Max']
      })

      expect(result).be.a('object')
      expect(result).have.property('male')
      expect(result.male).be.a('array')
      expect(result.male).be.length(3)
      expect(result.male[0]).be.equal('Garfield')
      expect(result.male[1]).be.equal('Nemo')
      expect(result.male[2]).be.equal('Tom')

      expect(result).have.property('female')
      expect(result.female).be.a('array')
      expect(result.female).be.length(2)
      expect(result.female[0]).be.equal('Max')
      expect(result.female[1]).be.equal('Sam')
    })

    it('should not throw an error, but sort if either of the array is empty', () => {
      const result = app.sortByName({
        male: [],
        female: ['Sam', 'Max']
      })

      expect(result).be.a('object')
      expect(result).have.property('male')
      expect(result.male).be.a('array')
      expect(result.male).be.empty

      expect(result).have.property('female')
      expect(result.female).be.a('array')
      expect(result.female).be.length(2)
      expect(result.female[0]).be.equal('Max')
      expect(result.female[1]).be.equal('Sam')
    })

    it('should not throw an error, but sort if either of the array is undefined', () => {
      const result = app.sortByName({
        male: ['Sam', 'Max'],
        female: undefined
      })

      expect(result).be.a('object')
      expect(result).have.property('male')
      expect(result.male).be.a('array')
      expect(result.male).be.length(2)
      expect(result.male[0]).be.equal('Max')
      expect(result.male[1]).be.equal('Sam')

      expect(result).have.property('female')
      expect(result.female).be.a('array')
      expect(result.female).be.empty
    })

    it('should return undefined if input is undefined', () => {
      const result = app.sortByName(undefined)
      expect(result).be.undefined
    })
  })
})