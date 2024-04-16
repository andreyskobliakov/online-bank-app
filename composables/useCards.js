import { ref, onMounted } from 'vue';

export default function useCards() {
  const cards = ref([]);
  const expandedCard = ref(null);

  const fetchCardData = async () => {
    const userId = localStorage.getItem('userId');
    const response = await fetch(`http://localhost:3001/getCards?userId=${userId}`);
    cards.value = await response.json();
    console.log(cards.value)
  };

  const toggleCard = (cardNumber) => {
    expandedCard.value = expandedCard.value === cardNumber ? null : cardNumber;
  };

  const isCardExpanded = (cardNumber) => {
    return expandedCard.value === cardNumber;
  };

  const getMaskedCardNumber = (cardNumber) => {
    cardNumber = String(cardNumber);
    const cardNumberWithSpaces = cardNumber.replace(/(.{4})/g, '$1 ');
    return cardNumberWithSpaces.trim();
  };

  onMounted(fetchCardData);

  return { cards, expandedCard, toggleCard, isCardExpanded, getMaskedCardNumber };
}

