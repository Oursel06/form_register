export const validateNom = (value) => {
    const regex = /^[A-Za-zÀ-ÿ '-]+$/;
    return regex.test(value) ? "" : "Nom invalide";
};

export const validatePrenom = (value) => {
    const regex = /^[A-Za-zÀ-ÿ '-]+$/;
    return regex.test(value) ? "" : "Prénom invalide";
};

export const validateEmail = (value) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(value) ? "" : "Email invalide";
};

export const validateDateNaissance = (value) => {
    const today = new Date();
    const dob = new Date(value);
    const age = today.getFullYear() - dob.getFullYear();
    return age > 18 ? "" : "L'âge doit être supérieur à 18 ans";
};

export const validateCodePostal = (value) => {
    const regex = /^\d{5}$/;
    return regex.test(value) ? "" : "Code postal invalide";
};

export const validateVille = (value) => {
    const regex = /^[a-zA-ZÀ-ÿ\s-]+$/;
    return regex.test(value) ? "" : "Ville invalide";
};
