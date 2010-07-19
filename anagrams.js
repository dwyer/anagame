/**
 * Shuffles the contents of an Array
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
