function Key(name, valuesMap, element, language) {
  this.name = name;
  this.values = valuesMap;
  this.element = element;
  this.value = valuesMap[language].default;

  this.setValue = (lang, shift, capsLock) => {
    let value = this.values[lang][shift ? 'shift' : 'default'];
    this.value = shift !== capsLock ? value.toUpperCase() : value.toLowerCase();
    this.element.innerText = this.value;
  };
}

function KeysValuesMap(enDefault, enShift, ruDefault, ruShift) {
  this.english = {
    default: enDefault,
    shift: enShift
  };
  this.russian = {
    default: ruDefault,
    shift: ruShift
  };
}

export { Key, KeysValuesMap };
