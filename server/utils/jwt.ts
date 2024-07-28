import jwt from 'jsonwebtoken';

import type { H3Event } from 'h3';
import { addDays, addMinutes } from 'date-fns';

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

export function setRefreshToken(event: H3Event, value: string) {
  const expires = addDays(new Date(), 30);

  setCookie(event, 'refreshToken', value, {
    httpOnly: true,
    sameSite: 'strict',
    expires,
  });
}

export function setAccessToken(event: H3Event, value: string) {
  const expires = addMinutes(new Date(), 10);

  setCookie(event, 'accessToken', value, {
    httpOnly: true,
    sameSite: 'strict',
    expires,
  });
}
