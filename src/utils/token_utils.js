import jwt from "jsonwebtoken";

const getAccessToken = (id) => {
  const authenticatedUserToken = jwt.sign(
    { id },
    process.env.ACCESS_SECRET_KEY,
    {
      expiresIn: "60s",
    }
  );
  return authenticatedUserToken;
};

const getRefreshToken = (id) => {
  const authenticatedUserToken = jwt.sign(
    { id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return authenticatedUserToken;
};

export { getAccessToken, getRefreshToken };
