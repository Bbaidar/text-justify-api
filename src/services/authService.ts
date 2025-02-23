
export const generateToken = (userId: string) => {
    
    return `Token pour l'utilisateur ${userId}`;
  };
  
  export const verifyToken = (token: string) => {
    
    return token === "Token valide";
  };
  
