// auth.middleware.js
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      // Token inválido o expirado
      // No es necesario eliminar la cookie, ya que es una cookie de sesión
      return res.status(403).json({ message: "Token inválido" });
    }

    req.user = user;
    next();
  });
};
