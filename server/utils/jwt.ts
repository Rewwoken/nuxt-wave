import jwt from 'jsonwebtoken';

interface Payload {
  id: string;
}

export function issueTokens(id: string) {
  const config = useRuntimeConfig();
  const payload: Payload = { id };

  const accessToken = jwt.sign(payload, config.jwtSecret, {
    expiresIn: '10m',
  });
  const refreshToken = jwt.sign(payload, config.jwtSecret, {
    expiresIn: '30d',
  });

  return { accessToken, refreshToken };
}

export function verifyToken(value: string) {
  const config = useRuntimeConfig();

  try {
    jwt.verify(value, config.jwtSecret);

    return true;
  }
  catch {
    return false;
  }
}

export function decodeToken(value: string) {
  return jwt.decode(value) as Payload;
}
