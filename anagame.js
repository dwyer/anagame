


function handleInput(input) {
  var wordIsValid = true; // until proven otherwise
  var lettersElement = document.getElementById('letters');
  clearLetterClassNames();
  for (var i = 0; i < input.value.length; i++) {
    var letterIsValid = false;
    for (var j = i; j < lettersElement.childNodes.length; j++) {
      if (input.value[i] == lettersElement.childNodes[j].innerHTML) {
        // place valid letter behind last valid letter
        lettersElement.insertBefore(lettersElement.childNodes[j],
                                    lettersElement.childNodes[i]);
        if (i) lettersElement.childNodes[i-1].className = 'selected';
        lettersElement.childNodes[i].className = 'selected infocus';
        letterIsValid = true;
        break;
      }
    }
    if (!letterIsValid) {
      wordIsValid = false;
      break;
    }
  }
  
  if (wordIsValid && window.event && window.event.keyCode == 13) {
    clearLetterClassNames();
    input.value = '';
  }
}


function clearLetterClassNames() {
  var lettersElement = document.getElementById('letters');
  for (var i = 0; i < lettersElement.childNodes.length; i++) {
    lettersElement.childNodes[i].className = null;
  }
}


function print(string) {
  document.body.appendChild(document.createTextNode(string + ' '));
}


window.onload = function () {
  var data = getData(6);
  
  var lettersElement = document.getElementById('letters');
  for (var i = 0; i < data.letters.length; i++) {
    var letterElement = document.createElement('span');
    letterElement.innerHTML = data.letters[i];
    lettersElement.appendChild(letterElement);
  }
  
  for (var i = 0; i < data.anagrams.length; i++) {
    print(data.anagrams[i]);
  }
};
