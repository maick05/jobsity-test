import { JWTPayload } from '../../../core/auth/jwt/jwt-payload.interface';
export class AuthenticatorExtractorHelper {
  static ExtractBasicAuth(authStr: string) {
    const b64auth = (authStr || '').split(' ')[1] || '';
    const [email, password] = Buffer.from(b64auth, 'base64')
      .toString()
      .split(':');
    return { email, password };
  }

  static ExtractBearerTokenAuth(authStr: string): JWTPayload {
    const base64Payload = authStr.split('.')[1];
    const payloadBuffer = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payloadBuffer.toString());
  }
}
