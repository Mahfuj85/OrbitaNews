import jwt from "jsonwebtoken";

export const onlyAdmin = async (req, res, next) => {
  try {
    //const token = req.cookies.access_token;
    const token =
      req.cookies.access_token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(403, "Unauthorized");
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (decodeToken.role === "admin") {
      req.user = decodeToken;
      next();
    } else {
      return next(403, "Unauthorized");
    }
  } catch (error) {
    next(500, error.message);
  }
};

// export const onlyAdmin = (req, res, next) => {
//   try {
//     // Try to get token from cookies OR Authorization header (Bearer token)
//     const token =
//       req.cookies?.access_token ||
//       (req.headers.authorization &&
//       req.headers.authorization.startsWith("Bearer ")
//         ? req.headers.authorization.split(" ")[1]
//         : null);

//     if (!token) {
//       console.log("No token found in request");
//       const error = new Error("Unauthorized: No token provided");
//       error.status = 403;
//       return next(error);
//     }

//     // Verify the token
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         console.log("JWT verification failed:", err.message);
//         const error = new Error("Unauthorized: Invalid token");
//         error.status = 403;
//         return next(error);
//       }

//       // Check if user role is admin
//       if (decoded.role !== "admin") {
//         console.log("User role is not admin:", decoded.role);
//         const error = new Error("Unauthorized: Insufficient permissions");
//         error.status = 403;
//         return next(error);
//       }

//       // Attach user info to req and continue
//       req.user = decoded;
//       next();
//     });
//   } catch (error) {
//     console.error("Unexpected error in onlyAdmin middleware:", error);
//     next(error);
//   }
// };
