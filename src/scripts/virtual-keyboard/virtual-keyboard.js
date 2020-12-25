import { KeysInfoMaps } from './constants';
import Keyboard from './keyboard';
import '../../assets/icons/close.svg';
import '../../assets/audio/tink.wav';
import '../../assets/audio/kick.wav';
import '../../assets/audio/boom.wav';
import '../../assets/audio/clap.wav';
import '../../assets/audio/hihat.wav';
import '../../assets/audio/openhat.wav';
import '../../assets/icons/backspace.svg';
import '../../assets/icons/caps-lock.svg';
import '../../assets/icons/english.svg';
import '../../assets/icons/enter.svg';
import '../../assets/icons/shift.svg';
import '../../assets/icons/close.svg';
import '../../assets/icons/microphone.svg';
import '../../assets/icons/space.svg';
import '../../assets/icons/left.svg';
import '../../assets/icons/right.svg';
import '../../assets/icons/voice.svg';

export default function initialize() {
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let inputElement = document.querySelector('.input-field').querySelector('input');
  let keyboardElement = document.querySelector('.keyboard');

  (function addKeysElements(keysInfoMaps) {
    keysInfoMaps.forEach(item => {
      let button = document.createElement('button');
      button.setAttribute('id', item[0]);
      button.classList.add('key');

      if (Array.isArray(item[1])) {
        button.classList.add('keyboard__key');
        button.setAttribute('name', 'key');
        button.innerText = item[1][0];
      } else {
        button.setAttribute('name', item[1].name);
        button.innerHTML = `<img src="${item[1].iconUrl}" alt="${item[1].name}">`;
        switch (item[1].name) {
          case 'backspace': button.classList.add('keyboard__key_very-wide');
            break;
          case 'capslock':
            button.classList.add('keyboard__key_wide');
            button.setAttribute('aria-checked', 'false');
            break;
          case 'enter': button.classList.add('keyboard__key_enter');
            break;
          case 'microphone':
            button.classList.add('keyboard__key_wide');
            button.setAttribute('aria-checked', 'false');
            break;
          case 'close': button.classList.add('keyboard__key');
            break;
          case 'shift':
            button.classList.add('keyboard__key_wide');
            button.setAttribute('aria-checked', 'false');
            break;
          case 'lang': button.classList.add('keyboard__key');
            break;
          case 'space': button.classList.add('keyboard__key_ultra-wide');
            break;
          case 'left': button.classList.add('keyboard__key');
            break;
          case 'right': button.classList.add('keyboard__key');
            break;
          case 'voice':
            button.classList.add('keyboard__key_wide');
            button.setAttribute('aria-checked', 'false');
            break;
          default: break;
        }
      }

      keyboardElement.appendChild(button);
    });
  }(KeysInfoMaps));

  let keysElements = document.querySelectorAll('.key');
  let audioElements = document.querySelectorAll('audio');
  let keyboard = new Keyboard(KeysInfoMaps, keysElements, inputElement, audioElements);

  keyboard.initial();
  keyboard.keysElements.forEach(element => {
    element.addEventListener('click', event => keyboard.clickKey(event));
  });
  inputElement.addEventListener('click', () => { keyboardElement.style.display = 'grid'; });
  window.addEventListener('keydown', event => {
    let key = keyboard.keys.get(+event.keyCode);

    if (key) {
      inputElement.focus();
      key.element.classList.add('key_click');
    }
  });
  window.addEventListener('keyup', event => {
    let key = keyboard.keys.get(+event.keyCode);

    if (key) {
      inputElement.focus();
      switch (key.name) {
        case 'capslock': keyboard.clickCapsLock(key.element);
          break;
        case 'shift': keyboard.clickShift(key.element);
          break;
        default: break;
      }
      key.element.classList.remove('key_click');
    }
  });
}
