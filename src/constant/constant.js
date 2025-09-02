// export const BACKEND_URL = 'http://localhost:5000/api';
// export const BASE_URL = 'http://localhost:5000/uploads';



export const BACKEND_URL = 'https://secure.castaiclakeboatrentals.com/api';
export const BASE_URL = 'https://secure.castaiclakeboatrentals.com/uploads';





//  Production
export const STRIPE_API_KEY = "pk_live_51RueMy2ZjGwUGMm0FEAwuLaFJIwibQrZjzD9JXx9frskLXII6g7AyifEUdZICPrH0WD4Ds5NJQ6XgqOjN3Esocjx001GIFacAf"





export const DEPOSIT_AMOUNT = 100
const RENT_TIME_OPTIONS = {
  FULL: 'full_day',
  HALF: 'half_day_morning',
};

const HALF_DAY_SLOTS = {
  MORNING: 'morning',
  EVENING: 'evening'
};

const DURATION_OPTIONS = {
  HALF_DAY: 'Half Day',
  FULL_DAY: 'Full Day'
};

const PAYMENT_METHODS = {
  CARD: 'card',
  CASH: 'cash'
};



export const RENT_DURATION = {
  FULL_DAY: 'full_day',
  HALF_DAY_MORNING: 'half_day_morning',
  HALF_DAY_EVENING: 'half_day_evening'
};

export const HALF_DAY_TIME = {
  MORNING: 'Morning',
  EVENING: 'Evening'
};

export const TIME_SLOTS = {
  [HALF_DAY_TIME.MORNING]: '6:30 AM – 12:30 PM',
  [HALF_DAY_TIME.EVENING]: '1:30 PM – 7:30 PM'
};

export { RENT_TIME_OPTIONS, HALF_DAY_SLOTS, DURATION_OPTIONS, PAYMENT_METHODS };