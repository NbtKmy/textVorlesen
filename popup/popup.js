const synth = window.speechSynthesis;

const inputForm = document.querySelector('form');
var voiceSelect = document.querySelector('select');

var pitch = document.querySelector('#pitchBar');
var pitchValue = document.querySelector('.pitch-value');
var rate = document.querySelector('#rateBar');
var rateValue = document.querySelector('.rate-value');
var configSet = document.querySelector('#configSet');
var textSet = document.querySelector('#textSet');
var lesenButton = document.querySelector('#lesen');

///////////////
// functions //
///////////////

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
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, (items) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }
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


////////////////////////////
// Seiteninhalt erstellen //
////////////////////////////

  populateVoiceList();
  getAllStorageSyncData().then( items => {
    if (items.config_exists){
    configSet.innerHTML = '<h3>Gespeicherte Konfiguration</h3>' + '<ul><li>Stimmhöhe: ' + items.selected_pitch + '</li><li>Geschwindigkeit: ' + items.selected_rate + '</li><li>Sprache: ' + items.selected_voice + '</li></ul>';
    
    }
  });


///////////////
// Triggers //
//////////////

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

    
    chrome.storage.sync.set( objSet , () => {
        
        alert('Die Einstellung ist im Browser gespeichert');
        getAllStorageSyncData().then( items => {
          configSet.innerHTML = '<h3>Gespeicherte Konfiguration</h3>' + '<ul><li>Stimmhöhe: ' + items.selected_pitch + '</li><li>Geschwindigkeit: ' + items.selected_rate + '</li><li>Sprache: ' + items.selected_voice + '</li></ul>';
        });
      });

    }


  pitch.onchange = function() {
    pitchValue.textContent = pitch.value;
    console.log(pitch.value);
  }
  rate.onchange = function() {
    rateValue.textContent = rate.value;
  }