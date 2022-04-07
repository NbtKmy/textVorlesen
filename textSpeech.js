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
*/

// This script will be executed on the active tab/window
function speakStart(text){

    const synth = window.speechSynthesis;
    synth.cancel();
    //console.log(text);
    
    const xyz = new Promise((resolve, reject) => {
        chrome.storage.sync.get(null, (items) => {
          if (chrome.runtime.lastError) {
            return reject(chrome.runtime.lastError);
          }
          resolve(items);
          
        });
      });


      xyz.then( vals => {

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
      synth.speak(utterThis);
    
      })
    }
      
    

function getTabID() {
  return new Promise((resolve, reject) => {
      try {
          chrome.tabs.query({
              active: true,
          }, function (tabs) {
              resolve(tabs[0].id);
          })
      } catch (e) {
          reject(e);
      }
  })
}


async function letItSpeak(text){
    
  let tabId = await getTabID();
  //console.log(text);
    chrome.scripting.executeScript(
      { 
        target: {tabId: tabId},
        func: speakStart,
        args: [text]
      },
      )
  
  
}

chrome.contextMenus.onClicked.addListener(function(info) {
  if (info.menuItemId == "Vorlesen") {
    let text = info.selectionText;
    //console.log(text);
    letItSpeak(text);
    
  }
});


chrome.contextMenus.removeAll(function() {
chrome.contextMenus.create({
    "id": "Vorlesen",
    "title": "Vorlesen!",
    "type": "normal",
    "contexts": ["selection"]
    }
  );
});