// Header http
export const AUTHORIZATION_HEADER: string = 'Authorization';
export const BASIC_PREFIX: string = 'Basic ';
export const BASIC_AUTH_SEPARATOR: string = ':';

// Local storage keys
export const STORAGE_AUTHENTICATION_TOKEN: string = 'Auth';
export const STORAGE_PROFILE_TOKEN: string = 'Profile';
export const CONFIRM_EMAIL: string = 'confirmEmail';

//Common http root api
export const ROOT: string = 'http://localhost:8081';
//export const ROOT: string = 'https://ptstr-backend.herokuapp.com';
export const API_ROOT_PATH: string = ROOT + '/api';
export const API_USERS_PATH: string = API_ROOT_PATH + '/users';
export const API_AUTHENTICATE_PATH: string = API_USERS_PATH + '/authenticate';
export const API_PETS_PATH: string = API_ROOT_PATH + '/pets';
export const API_CATEGORIES_PATH: string = API_ROOT_PATH + '/categories';

// Error message
export const SERVER_ERROR: string = 'Server error';
