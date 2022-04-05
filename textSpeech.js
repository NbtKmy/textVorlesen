/*
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
*/

chrome.contextMenus.onClicked.addListener(function(info) {
  if (info.menuItemId == "Vorlesen") {
    let text = info.selectionText;
    chrome.storage.sync.set( { 'text_zum_Vorlesen': text }, function(){
      //alert('Text zum Vorlesen kopiert.');
    });
  }
})


chrome.contextMenus.create({
    "id": "Vorlesen",
    "title": "Text zum Vorlesen kopieren",
    "type": "normal",
    "contexts": ["selection"]
    }
);
