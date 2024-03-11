// form.js
export function validateLoginForm(form) {
  let errors = {};

  // Валідація поля Login
  if (!form.login || form.login === '') {
    errors.login = 'Поле Login обов\'язкове для заповнення';
  } else if (form.login.length < 5) {
    errors.login = 'Login має містити не менше 5 символів';
  } else {
    delete errors.login;
  }

  // Валідація поля Password
  if (!form.password || form.password === '') {
    errors.password = 'Поле Password обов\'язкове для заповнення';
  } else if (form.password.length < 6) {
    errors.password = 'Пароль повинен містити не менше 6 символів';
  } else if (!/[A-Z]/.test(form.password)) {
    errors.password = 'Пароль повинен містити хоча б одну велику літеру';
  } else if (!/[0-9]/.test(form.password)) {
    errors.password = 'Пароль повинен містити хоча б одну цифру';
  } else {
    delete errors.password;
  }

  return errors;
}


export function validateRegisterForm(form) {
  let errors = {};

  // Валидация поля Name
  if (!form.name || form.name === '') {
    errors.name = 'Поле Name обов\'язкове для заповнення';
  } else if (form.name.length < 5) {
    errors.name = 'Ім\'я не може бути коротше 5 символів';
  } else {
    delete errors.name;
  }

  // Валидация поля Email
  if (!form.email || form.email === '') {
    errors.email = 'Поле Email обов\'язкове для заповнення';
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Email недійсний';
  } else {
    delete errors.email;
  }

  // Валидация поля Phone
  if (!form.phone || form.phone === '') {
    errors.phone = 'Поле Phone обов\'язкове для заповнення';
  } else if (!/^0\d{9}$/.test(form.phone)) {
    errors.phone = 'Номер починаэться з 0 і містити 10 цифр';
  } else {
    delete errors.phone;
  }

  // Валидация поля Password
  if (!form.password || form.password === '') {
    errors.password = 'Поле Password обов\'язкове для заповнення';
  } else if (form.password.length < 6) {
    errors.password = 'Пароль повинен містити не менше 6 символів';
  } else if (!/[A-Z]/.test(form.password)) {
    errors.password = 'Пароль повинен містити хоча б одну велику літеру';
  } else if (!/[0-9]/.test(form.password)) {
    errors.password = 'Пароль повинен містити хоча б одну цифру';
  } else {
    delete errors.password;
  }

  return errors;
}
