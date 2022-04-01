const synth = window.speechSynthesis;

const inputForm = document.querySelector('form');
let voiceSelect = document.querySelector('select');

let pitch = document.querySelector('#pitchBar');
let pitchValue = document.querySelector('.pitch-value');
let rate = document.querySelector('#rateBar');
let rateValue = document.querySelector('.rate-value');


function setSpeech() {
    return new Promise(
        function (resolve, reject) {
            let id;

            id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth.getVoices());
                    clearInterval(id);
                }
            }, 10);
        }
    )
}

function populateVoiceList() {
    
    let res = setSpeech();
    res.then((voices) => {
    //console.log(voices);   
    voices.forEach( voice => {
        let option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        if(voice.default) {
            option.textContent += ' -- DEFAULT';
        }
        option.setAttribute('data-lang', voice.lang);
        console.log(voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    })
    
  });
}



  populateVoiceList();

// wenn eine Konfiguration im Browser vorhanden ist...
chrome.storage.sync.get('config_exists', items => {
    
    pitchValue.textContent = items.selected_pitch;
    rateValue.textContent = items.selected_rate;
    
  });

  inputForm.onsubmit = event => {
    event.preventDefault();
    let selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
    let selectedLangName = voiceSelect.selectedOptions[0].getAttribute('data-lang');

    chrome.storage.sync.set({
        config_exists: true,
        selected_pitch: pitch.value,
        selected_rate: rate.value,
        selected_voice: selectedVoiceName,
        selected_lang: selectedLangName,
      }, () => {
        alert('Die Einstellung ist im Browser gespeichert');
      });
  }

  pitch.onchange = function() {
    pitchValue.textContent = pitch.value;
  }
  rate.onchange = function() {
    rateValue.textContent = rate.value;
  }

