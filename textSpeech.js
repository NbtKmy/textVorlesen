


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




function speakStart(text, pitchValue, rateValue, langValue){

    speechSynthesis.cancel();
    
    if (text !== '') {
    let utterThis = new SpeechSynthesisUtterance(text);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    
    utterThis.lang = langValue;
    utterThis.pitch = pitchValue;
    utterThis.rate = rateValue;
    speechSynthesis.speak(utterThis);
  }
}

chrome.contextMenus.create({
    "title": "Vorlesen!",
    "type": "normal",
    "contexts": ["selection"],
    "onclick": function(info) {
        let text = info.selectionText;
        let pitchValue, rateValue, langValue

        // wenn eine Konfiguration im Browser vorhanden ist...
        getAllStorageSyncData().then( vals => {
            console.log(vals.config_exists);
            if (vals.config_exists){
                pitchValue = vals.selected_pitch;
                rateValue = vals.selected_rate;
                langValue = vals.selected_lang;
            }
            else {
                pitchValue = 1;
                rateValue = 1;
                langValue = 'ja-JP';
            }
            console.log(pitchValue);
            speakStart(text, pitchValue, rateValue, langValue);
        });
    }
});
