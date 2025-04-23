describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

  })
  it('Preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghiklmnoprstuvwzyx', 10)

    cy.get('#firstName').type('Bruno')
    cy.get('#lastName').type('Mocellin')
    cy.get('#email').type('brun0_lp@hotmail.com')
    cy.get('#phone').type('51991422570')
    cy.get('#email-checkbox').click()
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Bruno')
    cy.get('#lastName').type('Mocellin')
    cy.get('#email').type('brun0_lp@hotmail,com')
    cy.get('#phone').type('51991422570')
    cy.get('#email-checkbox').click()
    cy.get('#open-text-area').type('test')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Campo telefone continua vazio quando preenchido com um valor não-númerico', () => {
    cy.get('#phone')
      .type('abc')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Bruno')
    cy.get('#lastName').type('Mocellin')
    cy.get('#email').type('brun0_lp@hotmail,com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('test')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Bruno')
      .should('have.value', 'Bruno')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Mocellin')
      .should('have.value', 'Mocellin')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('brun0_lp@hotmail.com')
      .should('have.value', 'brun0_lp@hotmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('51991422570')
      .should('have.value', '51991422570')
      .clear()
      .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Envia o formulário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Bruno',
      lastName: 'Mocellin',
      email: 'brun0_lp@hotmail.com',
      phone: '51991422570',
      text: 'teste',
    }

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('Seleciona um produto (Mentoria) por seu valor', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('Seleciona um produto (Blog) por seu indice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('Marca o tipo de atendimento "Feedack"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })
  it('Marca cada tipo de atendimento"', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('to.be.checked')
      })
  })
  it('Marcar ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('to.be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Seleciona um arquivo da pastas fixtures', () => {
    cy.get('#file-upload')
      .selectFile('./cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo simulando um drag-n-drop', () => {
    cy.get('#file-upload')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  
  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alisa', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
    .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })
})
