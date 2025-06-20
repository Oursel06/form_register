describe('Flux complet utilisateur', () => {
    it('Inscription, connexion, affichage infos', () => {
        cy.visit('/');

        const email = `user${Date.now()}@example.com`;

        cy.get('[data-testid="register-prenom"]').type('John');
        cy.get('[data-testid="register-nom"]').type('Doe');
        cy.get('[data-testid="register-email"]').type(email);
        cy.get('[data-testid="register-dateNaissance"]').type('1990-01-01');
        cy.get('[data-testid="register-ville"]').type('Paris');
        cy.get('[data-testid="register-codePostal"]').type('75000');
        cy.get('[data-testid="register-password"]').type('Password123!');

        cy.get('[data-testid="registration-form"]').submit();
        cy.get('[data-testid="toast-success"]').should('be.visible');

        cy.get('[data-testid="switch-to-login"]').click();

        cy.get('[data-testid="login-email"]').type(email);
        cy.get('[data-testid="login-password"]').type('Password123!');
        cy.get('[data-testid="login-form"]').submit();

        cy.url().should('include', '/home');
        cy.contains('Mes informations').should('be.visible');
        cy.contains(email).should('be.visible');
        cy.contains('John').should('be.visible');
        cy.contains('Doe').should('be.visible');
    });

    it('Admin gère les utilisateurs', () => {
        cy.visit('/');

        cy.get('[data-testid="login-email"]').type('admin@example.com');
        cy.get('[data-testid="login-password"]').type('admin123');
        cy.get('[data-testid="login-form"]').submit();

        cy.url().should('include', '/home');
        cy.contains('Liste des utilisateurs').should('be.visible');

        cy.get('[data-testid^="delete-user-"]').first().click();
        cy.contains('Utilisateur supprimé').should('be.visible');

        cy.get('tbody tr').should('have.length.lessThan', 2);

        cy.get('.logout-button').click();
        cy.url().should('not.include', '/home');
    });

    it('Validation formulaire inscription', () => {
        cy.visit('/');

        cy.get('[data-testid="register-prenom"]').type('123');
        cy.get('[data-testid="error-prenom"]').should('be.visible');

        cy.get('[data-testid="register-nom"]').type('456');
        cy.get('[data-testid="error-nom"]').should('be.visible');

        cy.get('[data-testid="register-email"]').type('invalid-email');
        cy.get('[data-testid="error-email"]').should('be.visible');

        cy.get('[data-testid="register-dateNaissance"]').type('2020-01-01');
        cy.get('[data-testid="error-dateNaissance"]').should('be.visible');

        cy.get('[data-testid="register-codePostal"]').type('123');
        cy.get('[data-testid="error-codePostal"]').should('be.visible');

        cy.get('button[type="submit"]').should('be.disabled');
    });
});  