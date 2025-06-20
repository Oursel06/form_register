describe('Authentication Flow', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Permet de basculer entre connexion et inscription', () => {
        cy.get('[data-testid="registration-form"]').should('be.visible');
        cy.contains('Connexion').click();
        cy.get('[data-testid="login-form"]').should('be.visible');
        cy.contains('Retour').click();
        cy.get('[data-testid="registration-form"]').should('be.visible');
    });

    it('Affiche erreur avec identifiants invalides', () => {
        cy.contains('Connexion').click();
        cy.get('[data-testid="login-email"]').type('invalid@example.com');
        cy.get('[data-testid="login-password"]').type('mauvaispass');
        cy.get('[data-testid="login-form"]').submit();
    });

    it('Connexion réussie admin', () => {
        cy.get('[data-testid="login-email"]').type('admin@example.com');
        cy.get('[data-testid="login-password"]').type('passwordAdmin');
        cy.get('[data-testid="login-form"]').submit();

        cy.contains('Bonjour').should('be.visible');
        cy.contains('admin@example.com').should('be.visible');
        cy.get('.logout-button').should('be.visible');
        cy.contains('Liste des utilisateurs').should('exist');
    });

    it('Connexion réussie utilisateur', () => {
        cy.get('[data-testid="login-email"]').type('user@example.com');
        cy.get('[data-testid="login-password"]').type('passwordUser');
        cy.get('[data-testid="login-form"]').submit();

        cy.contains('Bonjour').should('be.visible');
        cy.contains('user@example.com').should('be.visible');
        cy.get('.logout-button').should('be.visible');
        cy.contains('Mes informations').should('exist');
    });

    it('Déconnexion fonctionne', () => {
        cy.get('[data-testid="login-email"]').type('admin@example.com');
        cy.get('[data-testid="login-password"]').type('passwordAdmin');
        cy.get('[data-testid="login-form"]').submit();

        cy.get('.logout-button').click();

        cy.get('[data-testid="login-form"]').should('be.visible');
      });
});
