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
        sendUrl: 'https://google.com',
    },

    // Facebook
    {
        name: 'Facebook',
        image: '/social-logins/facebook-logo.png',
        sendUrl: 'https://facebook.com',
    },

    // Github
    {
        name: 'Github',
        image: '/social-logins/github-logo.png',
        sendUrl: 'https://github.com',
    },
];
