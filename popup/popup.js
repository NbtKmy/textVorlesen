const synth = window.speechSynthesis;

const inputForm = document.querySelector('form');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitchBar');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rateBar');
var rateValue = document.querySelector('.rate-value');
var configSet = document.querySelector('#configSet');

var pitchSet, rateSet, voiceSet;


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

function getAllStorageSyncData() {
  // Immediately return a promise and start asynchronous work
  return new Promise((resolve, reject) => {
    // Asynchronously fetch all data from storage.sync.
    chrome.storage.sync.get(null, (items) => {
      // Pass any observed errors down the promise chain.
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
      // Pass the data retrieved from storage down the promise chain.
      resolve(items);
    });
  });
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
        //console.log(voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    })
    
  });
}


  populateVoiceList();


// wenn eine Konfiguration im Browser vorhanden ist...
/*
chrome.storage.sync.get('config_exists', bool => {
    
    if (bool.config_exists) {

      chrome.storage.sync.get('selected_pitch', p => {
        pitchSet = p.selected_pitch;
      });
      chrome.storage.sync.get('selected_rate', r => {
        rateSet = r.selected_rate;
      });
      chrome.storage.sync.get('selected_voice', v => {
        voiceSet = v.selected_voice;
      });

      configSet.innerHTML = 'Gespeicherte Konfiguration:<br>' + 'Stimmhöhe: ' + pitchSet + '<br>Geschwindigkeit: ' + rateSet + '<br>Sprache: ' + voiceSet;
    }
  });
  */


  inputForm.onsubmit = event => {
    event.preventDefault();
    let selectedVoiceName = voiceSelect.selectedOptions[0].getAttribute('data-name');
    let selectedLangName = voiceSelect.selectedOptions[0].getAttribute('data-lang');

    let objSet = {
      'config_exists': true,
      'selected_pitch': pitch.value,
      'selected_rate': rate.value,
      'selected_voice': selectedVoiceName,
      'selected_lang': selectedLangName,
    };
    console.log(objSet);
    
    chrome.storage.sync.set( objSet , () => {
        
        alert('Die Einstellung ist im Browser gespeichert');
        getAllStorageSyncData().then( items => {
          configSet.innerHTML = 'Gespeicherte Konfiguration:<br>' + 'Stimmhöhe: ' + items.selected_pitch + '<br>Geschwindigkeit: ' + items.selected_rate + '<br>Sprache: ' + items.selected_voice;
        });
      });
  }

  pitch.onchange = function() {
    pitchValue.textContent = pitch.value;
  }
  rate.onchange = function() {
    rateValue.textContent = rate.value;
  }

