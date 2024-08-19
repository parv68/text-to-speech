const msg = new SpeechSynthesisUtterance();
let voices = [];
const voiceDropdown = document.querySelector('[name="voice"]');
const textInput = document.querySelector('[name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

function populateVoices() {
  voices = speechSynthesis.getVoices();
  const voiceOptions = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
  voiceDropdown.innerHTML = `<select>${voiceOptions}</select>`;
}

function setVoice() {
  msg.voice = voices.find(voice => voice.name === voiceDropdown.value);
}

function toggle() {
  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

function setOption() {
  msg[this.name] = this.value;
  toggle();
}

const options = document.querySelectorAll('[type="range"], [name="pitch"], [name="rate"]');

speechSynthesis.addEventListener('voiceschanged', populateVoices);
populateVoices();

voiceDropdown.addEventListener('change', setVoice);
options.forEach(option => {
  option.addEventListener('change', setOption);
});
textInput.addEventListener('input', () => {
  msg.text = textInput.value;
});

speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => {
  speechSynthesis.cancel();
});