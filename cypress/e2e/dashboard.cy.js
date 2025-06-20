describe('Dashboard Admin', () => {
    const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluI';

    beforeEach(() => {
        cy.visit('/');
        cy.window().then(win => {
            win.localStorage.setItem('token', adminToken);
        });
        cy.visit('/');
    });

    it('Affiche liste utilisateurs', () => {
        cy.contains('utilisateurs').should('exists');
    });

    it('Supprime un utilisateur', () => {
        cy.get('[data-testid^="delete-user-"]').first().click();
        cy.get('[data-testid^="user-row-"]').should('have.length.lessThan', 2);
    });
});

describe('Dashboard Utilisateur', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.window().then((win) => {
            win.localStorage.setItem('token', 'fake-user-token');
            win.localStorage.setItem('userRole', 'user');
            win.localStorage.setItem('userEmail', 'user@example.com');
        });
        cy.visit('/');
    });

    it('Affiche infos utilisateur', () => {
        cy.contains('utilisateur').should('be.visible');
    });
});
  