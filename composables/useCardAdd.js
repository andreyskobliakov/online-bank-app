import { ref } from 'vue';

export function useCardAdd() {
  const errors = ref({});

  const validateName = (name) => {
    if (!name) {
      errors.value.name = 'Будь ласка, оберіть назву.';
    } else {
      delete errors.value.name;
    }
  };

  const validateType = (type) => {
    if (!type) {
      errors.value.type = 'Будь ласка, оберіть тип картки.';
    } else {
      delete errors.value.type;
    }
  };

  const validateCreditLimit = (creditLimit, showCreditLimit) => {
    if (showCreditLimit && !creditLimit) {
      errors.value.creditLimit = 'Будь ласка, введіть кредитний ліміт.';
    } else {
      delete errors.value.creditLimit;
    }
  };

  const validateCurrency = (currency) => {
    if (!currency) {
      errors.value.currency = 'Будь ласка, оберіть валюту.';
    } else {
      delete errors.value.currency;
    }
  };

  const validateForm = () => {
    return Object.keys(errors.value).length === 0;
  };

  return {
    errors,
    validateName,
    validateType,
    validateCreditLimit,
    validateCurrency,
    validateForm,
  };
}
