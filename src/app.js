export class App {
  helloWorld() {
    return 'Hello World!'
  }

  fetch() {
    return window.fetch('/api/people.json', {
        header: {
          host: 'agl-developer-test.azurewebsites.net',
          cookie: 'ARRAffinity=500b81cbe62a1dd9b056e6e439f1f005b4833ca7b08b42f5b252ed2c64ccfdf4',
          method: 'GET',
          credentials: 'include'
        },
        credentials: 'include'
      })
      .then(response => response.json())
  }

  start() {
    this.fetch().then(data => console.log(data));
  }
}