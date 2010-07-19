/**
 * Shuffles the contents of a String
 */
Array.prototype.shuffle = function () {
  for (var rnd, tmp, i = this.length; i; rnd = parseInt(Math.random() * i),
      tmp = this[--i], this[i] = this[rnd], this[rnd] = tmp);
};


function randword(words, len) {
  while (true) {
    var word = words[Math.floor(Math.random() * words.length)];
    if (word.length == len) return word;
  }
}


function findAnagrams(word, words) {
  var anagrams = [];
  for (var i = 0; i < words.length; i++) {
    if (isAnagram(words[i], word)) {
      anagrams.push(words[i]);
    }
  }
  return anagrams;
}


function isAnagram(word1, word2) {
  for (var i = 0; i < word1.length; i++) {
    if (word2.indexOf(word1[i]) == -1) {
      return false;
    } else {
      word2 = word2.replace(word1[i], '');
    }
  }
  return true;
}


function sortByLength(a, b) {
  if (a.length < b.length) {
    return -1;
  } else if (a.length > b.length) {
    return 1;
  } else {
    return 0;
  }
}


function getData(len) {
  var word = randword(dict, len);
  var letters = [];
  for (var i = 0; i < word.length; i++) {
    letters[i] = word[i];
  }
  letters.shuffle();
  var anagrams = findAnagrams(word, dict);
  anagrams.sort(sortByLength);
  return {letters: letters, anagrams: anagrams};
}


function print(string) {
  document.body.appendChild(document.createTextNode(string + ' '));
}


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
