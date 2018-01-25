var docs = null;
var indices = null;
window.onload = function() {
  docs = getElem("documents");
  docs.innerHTML = JSON.stringify(startingDoc);
  indices = makeIndices(JSON.parse(docs.innerHTML));
}
var startingDoc = [
  {
    title:"allLetters",
    text: "The quick brown fox jumps over the lazy dog",
  },
  {
    title:"popCulture",
    text:"What does the fox say"
  }
];

function beginQuery() {
  docs = getElem("documents");
  indices =  makeIndices(JSON.parse(docs.innerHTML));
  var queryString = getElem("query").value;
  log("query string:");
  log(queryString);
  getElem("query").disabled = true;
  getElem("submitQuery").disabled = true;
  var listOfRelevantDocuments = [];
  var toSearch = queryString.split(" ");
  toSearch.forEach(function(s) {
    listOfRelevantDocuments.push(indices[s]);
  })
  log(listOfRelevantDocuments);

  getElem("query").disabled = false;
  getElem("submitQuery").disabled = false;
  displayResults(listOfRelevantDocuments);
}

function displayResults(results) {
  var resultDiv = getElem("searchResults");
  results.forEach(function(r){
    resultDiv.appendChild(document.createTextNode(r.toString()));
  })
}
// function validateDocument() {
//   console.log("val",  JSON.parse(docs.innerHTML));
// }

function makeIndices(doc){
  // log(docCount);
  var uniqWords = {};
  doc.forEach(function(d) {
    var wordsInDoc = d.text.split(' ');
    // log(wordsInDoc);
    for (j = 0; j < wordsInDoc.length; j++) {
      var currWord = wordsInDoc[j].toLowerCase();
      // log(currWord);
      if (uniqWords[currWord] == undefined){
        uniqWords[currWord] = [d.title];
      } else if (uniqWords[currWord].includes(d.title) == false) {
        uniqWords[currWord].push(d.title);
      }
    }
  });
  log(uniqWords);
  return uniqWords;
}

// utility functions and aliases

function log(text) {
  console.log(text);
}
function getElem(id) {
  return document.getElementById(id);
}
