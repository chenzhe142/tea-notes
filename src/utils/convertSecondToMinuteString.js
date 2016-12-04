export default function convertSecondToMinuteString(convertedTime, SYMBOL_MINUTE, SYMBOL_SECOND) {

  let minutePart = {
    text: '',
    isAvailable: false
  };

  if (convertedTime.minute > 0) {
    minutePart = {
      text: `${convertedTime.minute} ${SYMBOL_MINUTE}`,
      isAvailable: true
    };
  }

  let secondPart = {
    text: '',
    isAvailable: false
  };

  if (convertedTime.second > 0) {
    secondPart = {
      text: `${convertedTime.second} ${SYMBOL_SECOND}`,
      isAvailable: true
    };
  }

  let space = '';
  if (minutePart.isAvailable && secondPart.isAvailable) {
    space = ' ';
  }

  return `${minutePart.text}${space}${secondPart.text}`;

}
