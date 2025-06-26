import values from './values';

// Functions with important functionality which should be in Firebase Cloud Functions
const getCoinReward = (minutes: number) => {
  let coinsGiven = 0;

  // Max out at 3hrs or more
  if (minutes >= 180) {
    coinsGiven +=
      60 / values.FIRST_HOUR_RATE +
      60 / values.SECOND_HOUR_RATE +
      60 / values.THIRD_HOUR_RATE;
    return coinsGiven;
  }

  // 1st hour
  if (minutes > 60) {
    coinsGiven += Math.floor(60 / values.FIRST_HOUR_RATE);
  } else {
    coinsGiven += Math.floor(minutes / values.FIRST_HOUR_RATE);
    return coinsGiven;
  }

  // 2nd hour
  if (minutes > 120) {
    coinsGiven += Math.floor(60 / values.SECOND_HOUR_RATE);
  } else {
    let rewardableMinutes = minutes - 60;
    coinsGiven += Math.floor(rewardableMinutes / values.SECOND_HOUR_RATE);
    return coinsGiven;
  }

  // 3rd hour onwards
  let rewardableMinutes = minutes - 120;
  coinsGiven += Math.floor(rewardableMinutes / values.THIRD_HOUR_RATE);

  return coinsGiven;
};

const functions = {
  getCoinReward,
};

export default functions;
