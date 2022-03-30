//pitch, rate & lang - might create a console panel  
let pitchValue = 1;
let rateValue = 1;
let langValue = 'ja-JP'

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

        speakStart(text, pitchValue, rateValue, langValue);
    }
});
