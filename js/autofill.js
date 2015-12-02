var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

var classes = ['CS 1100','CS 1301','CS 1331','CS 1332', 'CS 1371', 'CS 2110', 
  'CS 2200', 'CS 2340', 'CS 3510', 'CS 3600', 'CS 4400', 'CS 4460', 'MATH 2605',
  'MATH 3012'
];

$('#the-basics .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1,
},
{
  name: 'classes',
  source: substringMatcher(classes)
});
$('.typeahead').typeahead('open');

function addRow() {
    var div = document.createElement('div');

    div.className = 'entry';
    var temp = document.getElementById('typing').value;
    var para = document.createElement("p");
    var node = document.createTextNode(temp);
    para.appendChild(node);
    console.log(temp);
    // div.innerHTML = '<input type="button" value="X" onclick="removeRow(this)">';
    div.appendChild(para);
    document.getElementById('results').appendChild(div);

     //results.innerHTML = temp;
}

function removeRow(input) {
    document.getElementById('results').removeChild( input.parentNode );
}