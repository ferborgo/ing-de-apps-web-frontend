import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

const config = new AuthServiceConfig([{
  id: GoogleLoginProvider.PROVIDER_ID,
  provider: new GoogleLoginProvider('944523695241-o2apa0vd2li51gf2vcmupr2q341mc2l9.apps.googleusercontent.com')
}]);

export function provideConfig() {
  return config;
}
