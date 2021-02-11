import { Key, KeysValuesMap } from './key';

export default function Keyboard(keysInfoMaps, keysElements, inputElement, audioElements) {
  this.keysInfoMaps = keysInfoMaps;
  this.keysElements = Array.from(keysElements);
  this.inputElement = inputElement;
  this.audioElements = Array.from(audioElements);
  this.keys = new Map();
  this.capsLock = false;
  this.shift = false;
  this.microphone = false;
  this.close = false;
  this.voice = false;
  this.language = 'english';
  // eslint-disable-next-line no-undef
  this.recognition = new SpeechRecognition();

  this.initial = () => {
    this.recognition.onresult = event => {
      let text = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

      this.insertText(text);
    };

    this.keysInfoMaps.forEach(item => {
      if (Array.isArray(item[1])) {
        this.keys.set(item[0], new Key(
          'key',
          new KeysValuesMap(...item[1]), this.keysElements.find(element => +element.id === item[0]), 'english'
        ));
      } else {
        this.keys.set(
          item[0],
          {
            name: item[1].name,
            element: this.keysElements.find(element => +element.id === item[0])
          }
        );
      }
    });
  };
  this.clickKey = event => {
    let key = this.keys.get(+event.currentTarget.id);

    if (key.name === 'key') {
      this.insertText(key.value);
    } else {
      switch (key.name) {
        case 'backspace': this.clickBackspace();
          break;
        case 'capslock': this.clickCapsLock(key.element);
          break;
        case 'enter': this.insertText('\n');
          break;
        case 'microphone': this.clickMicrophone(key.element);
          break;
        case 'close': this.closeKeyboard();
          break;
        case 'shift': this.clickShift(key.element);
          break;
        case 'lang': this.clickLang(key.element);
          break;
        case 'space': this.insertText(' ');
          break;
        case 'left': this.clickLeft();
          break;
        case 'right': this.clickRight();
          break;
        case 'voice': this.clickVoice(key.element);
          break;
        default: break;
      }
    }
    const input = document.querySelector('.input-field').querySelector('input');
    input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    if (this.voice) this.playAudio(key.name);
  };
  this.getCursorPosition = () => this.inputElement.selectionStart;
  this.setCursorPosition = position => {
    this.inputElement.selectionStart = position;
    this.inputElement.selectionEnd = position;
  };
  this.insertText = text => {
    let cursor = this.getCursorPosition();
    let value = this.inputElement.value;
    this.inputElement.value = `${value.substring(0, cursor)}${text}${value.substring(cursor, value.length)}`;
    this.setCursorPosition(cursor + text.length);
    this.inputElement.focus();
  };
  this.clickBackspace = () => {
    let cursor = this.getCursorPosition();
    let text = this.inputElement.value;

    if (cursor > 0) {
      this.inputElement.value = `${text.substring(0, cursor - 1)}${text.substring(cursor, text.length)}`;
      this.setCursorPosition(cursor - 1);
    } else {
      this.setCursorPosition(cursor);
    }

    this.inputElement.focus();
  };
  this.clickMicrophone = (element) => {
    this.microphone = !this.microphone;
    this.recognition.lang = this.language === 'english' ? 'en-US' : 'ru-RU';

    if (this.microphone) {
      this.recognition.onend = () => this.recognition.start();
      this.recognition.start();
    } else {
      this.recognition.onend = null;
      this.recognition.abort();
    }

    element.setAttribute('aria-checked', `${this.microphone}`);
  };
  this.closeKeyboard = () => {
    document.querySelector('.keyboard').style.display = 'none';
  };
  this.clickLeft = () => {
    let cursor = this.getCursorPosition();

    if (cursor > 0) {
      this.setCursorPosition(cursor - 1);
    } else {
      this.setCursorPosition(cursor);
    }

    this.inputElement.focus();
  };
  this.clickRight = () => {
    let cursor = this.getCursorPosition();
    let length = this.inputElement.value.length;

    if (cursor < length) {
      this.setCursorPosition(cursor + 1);
    } else {
      this.setCursorPosition(cursor);
    }

    this.inputElement.focus();
  };
  this.clickCapsLock = (element) => {
    this.capsLock = !this.capsLock;
    this.changeKeys();
    element.setAttribute('aria-checked', `${this.capsLock}`);
  };
  this.clickShift = (element) => {
    this.shift = !this.shift;
    this.changeKeys();
    element.setAttribute('aria-checked', `${this.shift}`);
  };
  this.clickLang = (element) => {
    this.language = this.language === 'english' ? 'russian' : 'english';
    this.changeKeys();
    element.childNodes[0].setAttribute('alt', `${this.language.substring(0, 2)}`);
    element.childNodes[0].setAttribute('src', `assets/${this.language}.svg`);
  };
  this.clickVoice = (element) => {
    this.voice = !this.voice;
    element.setAttribute('aria-checked', `${this.voice}`);
  };
  this.changeKeys = () => {
    this.keys.forEach(key => {
      if (key.name === 'key') {
        key.setValue(this.language, this.shift, this.capsLock);
      }
    });
  };
  this.playAudio = (name) => {
    let audio;

    switch (name) {
      case 'backspace': audio = this.audioElements.find(item => item.id === `${name}`);
        break;
      case 'capslock': audio = this.audioElements.find(item => item.id === `${name}`);
        break;
      case 'enter': audio = this.audioElements.find(item => item.id === `${name}`);
        break;
      case 'shift': audio = this.audioElements.find(item => item.id === `${name}`);
        break;
      default: audio = this.audioElements.find(item => item.id === `${this.language}`);
        break;
    }

    audio.currentTime = 0;
    audio.play();
  };
}
