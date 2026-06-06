describe('Login flow', () => {
  it('scenario: should authenticate user and navigate to home page', () => {
    cy.intercept('POST', 'https://forum-api.dicoding.dev/v1/login', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          token: 'token-123',
        },
      },
    }).as('login');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users/me', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          user: {
            id: 'user-1',
            name: 'Budi Forum',
            email: 'budi@example.com',
            avatar: 'https://example.com/avatar.png',
          },
        },
      },
    }).as('ownProfile');

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/threads', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          threads: [],
        },
      },
    });

    cy.intercept('GET', 'https://forum-api.dicoding.dev/v1/users', {
      statusCode: 200,
      body: {
        status: 'success',
        data: {
          users: [],
        },
      },
    });

    cy.visit('/login');
    cy.get('#email').type('budi@example.com');
    cy.get('#password').type('secret123');
    cy.contains('button', 'Masuk').click();

    cy.wait('@login');
    cy.wait('@ownProfile');
    cy.location('pathname').should('eq', '/');
    cy.contains('button', 'Keluar').should('be.visible');
  });
});
