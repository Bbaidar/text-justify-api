// src/services/authService.ts

export const generateToken = (userId: string) => {
    // Code pour générer un token (par exemple avec JWT)
    return `Token pour l'utilisateur ${userId}`;
  };
  
  export const verifyToken = (token: string) => {
    // Code pour vérifier un token (par exemple avec JWT)
    return token === "Token valide";
  };
  
