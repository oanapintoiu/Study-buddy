import App from "./App"

describe('My App', ({}) => {
  beforeEach(() => {
    cy.mount(<App />)
    cy.visit('/') 
  })

  it('loads the homepage and displays LoginForm', () => {
    cy.get('.LoginForm').should('be.visible') // assuming LoginForm has a class of "LoginForm"
  })

  it('displays login form when /login URL is visited', () => {
    cy.visit('/login')
    cy.get('.LoginForm').should('be.visible') // assuming LoginForm has a class of "LoginForm"
  })

  it('displays signup form when /signup URL is visited', () => {
    cy.visit('/signup')
    cy.get('.SignUpForm').should('be.visible') // assuming SignUpForm has a class of "SignUpForm"
  })

  it('does not show sidebar without a token', () => {
    cy.get('.Sidebar').should('not.exist') // assuming Sidebar has a class of "Sidebar"
  })

})