export const validateNomPrenom = (value) => {
    const regex = /^[a-zA-ZÀ-ÿ-]+$/;
    return regex.test(value) ? null : "Information invalide";
};

export const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(value) ? null : "Email invalide";
};

export const validateDateNaissance = (value) => {
    const today = new Date();
    const dob = new Date(value);
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 18) {
        return "L'âge doit être supérieur à 18 ans";
    }
    return null;
};

export const validateCodePostal = (value) => {
    const regex = /^\d{5}$/;
    return regex.test(value) ? null : "Code postal invalide";
};

export const validateVille = (value) => {
    const regex = /^[a-zA-ZÀ-ÿ\s-]+$/;
    return regex.test(value) ? null : "Ville invalide";
};
