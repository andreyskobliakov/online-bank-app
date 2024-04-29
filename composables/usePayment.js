import { ref } from 'vue';

export default function usePayment() {
  const phoneNumber = ref('');
  const amount = ref(null);
  const selectedCard = ref('');
  const showModal = ref(false);
  const isLoading = ref(false);

  const closeModal = () => {
    showModal.value = false;
    phoneNumber.value = '';
    amount.value = null;
    selectedCard.value = '';
  };

  const submitForm = async () => {
    isLoading.value = true;

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      const response = await fetch('http://localhost:3001/topUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: localStorage.getItem('userId'),
          cardNumber: selectedCard.value,
          amount: amount.value
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      showModal.value = true;
    } catch (error) {
      console.error('Помилка при відправці платежу', error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    phoneNumber,
    amount,
    selectedCard,
    showModal,
    isLoading,
    closeModal,
    submitForm
  };
}
