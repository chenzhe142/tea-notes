export default function findSelectedSettingOption(options) {
  for (let i = 0; i < options.length; i++) {
    if (options[i].isSelected === true) {
      return options[i].text;
    }
  }
}
