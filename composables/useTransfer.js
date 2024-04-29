import { ref } from 'vue';

export default function useTransfer() {
  const fromCard = ref('');
  const toCard = ref('');
  const amount = ref(0);
  const showModal = ref(false);

  const closeModal = () => {
    showModal.value = false;
  };

  const submitTransfer = async () => {
    const userId = localStorage.getItem('userId');

    try {
      const response = await fetch('http://localhost:3001/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          fromCardNumber: fromCard.value,
          toCardNumber: toCard.value,
          amount: amount.value
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      showModal.value = true;
    } catch (error) {
      console.error('Произошла ошибка при переводе средств', error);
    }
  };

  return {
    fromCard,
    toCard,
    amount,
    showModal,
    closeModal,
    submitTransfer,
  };
}
