import { environment } from '../../../../../environments/environment.development';

export interface SocialLoginOption {
    name: string;
    image: string;
    sendUrl: string;
}

export const socialAccessOptions: SocialLoginOption[] = [
    // Google
    {
        name: 'Google',
        image: '/social-logins/google-logo.png',
        sendUrl: environment.apiUri + '/auth/google',
    },
];
