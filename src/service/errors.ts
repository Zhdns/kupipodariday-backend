import { LANGUAGE } from './constants';

export const LENGTH_VALIDATION_ERROR = (
  min: number,
  max: number,
  lang: LANGUAGE,
) => {
  const errorRu = `Не короче ${min}, и не длиннее ${max}`;
  const errorEng = `Not shorter than ${min}, and not longer than ${max}`;

  if (lang === LANGUAGE.RU) {
    return errorRu;
  }

  return errorEng;
};

export const EMAIL_VALIDATION_ERROR = (lang: LANGUAGE) => {
  const errorRu = `Не валидный Email`;
  const errorEng = `Email is not valid`;

  if (lang === LANGUAGE.RU) {
    return errorRu;
  }

  return errorEng;
};

export const URL_VALIDATION_ERROR = (lang: LANGUAGE) => {
  const errorRu = `Не валидный URL адрес`;
  const errorEng = `URL is not valid`;

  if (lang === LANGUAGE.RU) {
    return errorRu;
  }

  return errorEng;
};

export const STRING_VALDATION_ERROR = (lang: LANGUAGE) => {
  const errorRu = `Не строка`;
  const errorEng = `Not a string`;

  if (lang === LANGUAGE.RU) {
    return errorRu;
  }

  return errorEng;
};

export const NUMBER_VALDATION_ERROR = (lang: LANGUAGE) => {
  const errorRu = `Не число`;
  const errorEng = `Not a number`;

  if (lang === LANGUAGE.RU) {
    return errorRu;
  }

  return errorEng;
};

export const AUTH_ERROR = (lang: LANGUAGE) => {
  const errorRu = `Токен не действителен`;
  const errorEng = `Token is not valid`;

  if (lang === LANGUAGE.RU) {
    return errorRu;
  }

  return errorEng;
};

export const SIGNIN_ERROR = (lang: LANGUAGE) => {
  const errorRu = `Логин или пароль неверны`;
  const errorEng = `Username or password is mot correct`;

  if (lang === LANGUAGE.RU) {
    return errorRu;
  }

  return errorEng;
};

export const ACCESS_ERROR = (lang: LANGUAGE) => {
  const errorEng = 'Access is denied';
  const errorRu = 'Доступ запрещен';

  if (lang === LANGUAGE.RU) {
    return errorRu;
  }

  return errorEng;
};

export const RAISED_ERROR = (lang: LANGUAGE) => {
  const errorEng = 'The fundraising has already started';
  const errorRu = 'Сбор средств уже начался';

  if (lang === LANGUAGE.RU) {
    return errorRu;
  }

  return errorEng;
};
