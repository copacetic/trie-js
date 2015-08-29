var fs = require("fs");

function Trie(value, children) {
  return {value: value || null, children: children || {}};
}

function triePrint(trie) {
  for (var value in trie.children) {
    var childTrie = trie.children[value];
    if (childTrie.value) {
      console.log(childTrie.value);
    }
    triePrint(childTrie);
  }
}

function trieInsert(trie, word, index) {
  index = index || 0;
  if (!root) {
    console.error("No root passed to trieInsert.");
    return;
  }

  if (word.length === 0) {
    console.log("Empty string cannot be inserted.");
    return;
  }

  if (trie.children[word[index]]) {
    if (index === word.length - 1) {
      trie.children[word[index]].value = word;
    } else {
      trieInsert(trie.children[word[index]], word, index + 1);
    }
  } else {
    var isWord = (word.length - 1 === index);
    trie.children[word[index]] = new Trie(isWord ? word : null);
    if (!isWord) {
      trieInsert(trie.children[word[index]], word, index + 1);
    }
  }
}

var contains = function(trie, word, index) {
  index = index || 0;
  if (trie.children[word[index]]) {
    if (index === word.length - 1) {
      if (trie.children[word[index]].value) {
        return true;
      } else {
        return false;
      }
    } else {
      return contains(trie.children[word[index]], word, index + 1);
    }
  } else {
    return false;
  }
};

function buildTrie(words) {
  console.log("Beginning to build trie...");
  var trie = new Trie();
  var word;
  for (var i=0; i < words.length; i++) {
    word = words[i];
    console.log("Inserting ", word);
    trieInsert(trie, word);
  }
  console.log("Done building trie!");

  return trie;
}

function isEnglish(trie, word) {
  console.log(word, " is English: ", contains(trie, word));
}

fs.readFile('/usr/share/dict/words', 'utf8', function (err, words) {
  if (err) {
    console.log(err);
    return;
  }
  words = words.split('\n');
  var trie = buildTrie(words);

  isEnglish(trie, "aardvark");
  isEnglish(trie, "hayg");
  isEnglish(trie, "pernicious");
  isEnglish(trie, "ingenious");
  isEnglish(trie, "gabig");
});
