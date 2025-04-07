import {
    validateNom,
    validatePrenom,
    validateEmail,
    validateDateNaissance,
    validateCodePostal,
    validateVille
} from './validations';

describe('Tests pour les fonctions de validation', () => {

    it('devrait retourner une erreur pour un nom invalide', () => {
        expect(validateNom('John123')).toBe('Nom invalide');
        expect(validateNom('!John')).toBe('Nom invalide');
    });

    it('devrait être valide pour un nom correct', () => {
        expect(validateNom('John')).toBe('');
        expect(validateNom('Marie-Ève')).toBe('');
    });

    it('devrait retourner une erreur pour un prénom invalide', () => {
        expect(validatePrenom('123Marie')).toBe('Prénom invalide');
        expect(validatePrenom('!Eve')).toBe('Prénom invalide');
    });

    it('devrait être valide pour un prénom correct', () => {
        expect(validatePrenom('Marie')).toBe('');
        expect(validatePrenom('Ève')).toBe('');
    });

    it('devrait retourner une erreur pour un email invalide', () => {
        expect(validateEmail('john.doe@')).toBe('Email invalide');
    });

    it('devrait être valide pour un email correct', () => {
        expect(validateEmail('john.doe@example.com')).toBe('');
    });

    it('devrait retourner une erreur si l\'âge est < 18', () => {
        const birthDateUnder18 = '2007-04-07';
        expect(validateDateNaissance(birthDateUnder18)).toBe('L\'âge doit être supérieur à 18 ans');
    });

    it('devrait être valide si l\'âge est > 18', () => {
        const birthDateOver18 = '2000-04-07';
        expect(validateDateNaissance(birthDateOver18)).toBe('');
    });

    it('devrait retourner une erreur pour un code postal invalide', () => {
        expect(validateCodePostal('1234')).toBe('Code postal invalide');
    });

    it('devrait être valide pour un code postal correct', () => {
        expect(validateCodePostal('75001')).toBe('');
    });

    it('devrait retourner une erreur pour une ville invalide', () => {
        expect(validateVille('Paris123')).toBe('Ville invalide');
    });

    it('devrait être valide pour une ville correcte', () => {
        expect(validateVille('Paris')).toBe('');
    });
});
