function GetValue(where, what, instead)
{
  if (what in where) {
    return where[what].$t;
  }
  return instead;
}

function DisplaySheet(feed) {
  var entries = feed.entry;
  var pager = "";

  // Magic number 0
  var days = GetValue(entries[0], "gsx$header", "");
  var past = GetValue(entries[0], "gsx$past", "");
  var future = GetValue(entries[0], "gsx$future", "");

  pager += '<body>';
  pager += "<h3>" + days + " days of Prod-eng-core pager<br>" + past + " through " + future + "</h3>";

  pager += '<table>';
  pager += ' <thead>';
  pager += '  <tr>';
  pager += '    <th>Who</th>';
  pager += '    <th>On-call hours</th>';
  pager += '    <th>Days with on-call</th>';
  pager += '  </tr>';
  pager += ' </thead>';
  pager += '<tbody>';

  // Magic number 3
  for (var row = 3; row < entries.length; row += 1) {
    pager += "<tr><td data-label=Who>" + GetValue(entries[row], "gsx$header", "");
    pager += "</td><td data-label=Hours>" + GetValue(entries[row], "gsx$past", "");
    pager += "</td><td data-label=Days>" + GetValue(entries[row], "gsx$future", "");
    pager += "</td></tr>\n";
  }

  pager += '</tbody>';
  pager += '</table>';

  return pager;
}
