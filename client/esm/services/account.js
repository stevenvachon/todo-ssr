import http from '../util/HttpRequest';

export const signIn = data => http.post('signin', data);

export const signOut = () => http.post('signout');

export const signUp = data => http.post('signup', data);
