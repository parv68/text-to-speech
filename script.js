const msg = new SpeechSynthesisUtterance();
let voices = [];
const voiceDropdown = document.querySelector('[name="voice"]');
const textInput = document.querySelector('[name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const options = document.querySelectorAll('[type="range"], [name="pitch"], [name="rate"]');

function populateVoices() {
  voices = speechSynthesis.getVoices();
  const voiceOptions = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
  voiceDropdown.innerHTML = voiceOptions; // Populate the dropdown correctly
}

function setVoice() {
  msg.voice = voices.find(voice => voice.name === voiceDropdown.value);
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    msg.text = textInput.value;
    speechSynthesis.speak(msg);
  }
}

function setOption() {
  msg[this.name] = this.value;
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
populateVoices();

voiceDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));
