// useCardType.js
export default function useCardType() {
    const cardClass = (card) => {
      switch (card.name.toLowerCase()) {
        case 'blue':
          return 'bg-card-blue-gradient';
        case 'red':
          return 'bg-card-red-gradient';
        case 'premium':
          return 'bg-card-premium-gradient';
      }
    };
  
    const isVisaCard = (card) => {
      return ['blue', 'red'].includes(card.name.toLowerCase());
    };
  
    const isPremiumCard = (card) => {
      return ['premium'].includes(card.name.toLowerCase());
    };
  
    return { cardClass, isVisaCard, isPremiumCard };
  }