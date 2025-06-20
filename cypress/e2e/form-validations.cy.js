describe('Validations Formulaire', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('Inscription').click();
    });

    it('Champs obligatoires à la soumission', () => {
        cy.get('[data-testid="registration-form"]').submit();
        cy.get('[data-testid="error-firstName"]').should('be.visible');
        cy.get('[data-testid="error-lastName"]').should('be.visible');
        cy.get('[data-testid="error-email"]').should('be.visible');
        cy.get('[data-testid="error-birthDate"]').should('be.visible');
        cy.get('[data-testid="error-city"]').should('be.visible');
        cy.get('[data-testid="error-postalCode"]').should('be.visible');
        cy.get('[data-testid="error-password"]').should('be.visible');
    });

    it('Validation format noms (pas de chiffres)', () => {
        cy.get('[data-testid="input-firstName"]').type('John123');
        cy.get('[data-testid="input-lastName"]').type('Doe456');
        cy.get('[data-testid="registration-form"]').submit();
        cy.get('[data-testid="error-firstName"]').should('be.visible');
        cy.get('[data-testid="error-lastName"]').should('be.visible');
    });

    it('Validation format email invalide', () => {
        cy.get('[data-testid="input-email"]').type('invalid-email');
        cy.get('[data-testid="registration-form"]').submit();
        cy.get('[data-testid="error-email"]').should('be.visible');
    });

    it('Validation âge >= 18 ans', () => {
        const today = new Date();
        const under18 = new Date(today.setFullYear(today.getFullYear() - 17));
        const dateString = under18.toISOString().split('T')[0];

        cy.get('[data-testid="input-birthDate"]').type(dateString);
        cy.get('[data-testid="registration-form"]').submit();
        cy.get('[data-testid="error-birthDate"]').should('be.visible');
    });

    it('Validation code postal à 5 chiffres', () => {
        cy.get('[data-testid="input-postalCode"]').type('123');
        cy.get('[data-testid="registration-form"]').submit();
        cy.get('[data-testid="error-postalCode"]').should('be.visible');
    });

    it('Message succès avec formulaire valide', () => {
        const email = `test${Date.now()}@example.com`;

        cy.get('[data-testid="input-firstName"]').type('John');
        cy.get('[data-testid="input-lastName"]').type('Doe');
        cy.get('[data-testid="input-email"]').type(email);
        cy.get('[data-testid="input-birthDate"]').type('1990-01-01');
        cy.get('[data-testid="input-city"]').type('Paris');
        cy.get('[data-testid="input-postalCode"]').type('75000');
        cy.get('[data-testid="input-password"]').type('Password123!');

        cy.get('[data-testid="registration-form"]').submit();
        cy.get('[data-testid="toast-success"]').should('be.visible');
    });
});  