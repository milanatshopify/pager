function GetValue(where, what, instead)
{
  if (what in where) {
    return where[what].$t;
  }
  return instead;
}

var MAP = ["gsx$header", "gsx$past", "gsx$future", "gsx$days"];

function DisplaySheet(feed) {
  var entries = feed.entry;
  var pager = "";

  // Magic number 0
  var days = GetValue(entries[0], "gsx$header", "");
  var past = GetValue(entries[0], "gsx$past", "");
  var future = GetValue(entries[0], "gsx$future", "");

  pager += "<body>";
  pager += "<h3>" + days + " days of Prod-eng-core pager<br>" + past + " through " + future + "</h3>";

  pager += "<table>";
  pager += " <thead>";
  pager += "  <tr>";
  for (var col = 0; col < 4; col += 1) {
    // Magic number 1
    pager += "    <th>" + GetValue(entries[1], MAP[col], "") + "</th>";
  }
  pager += "  </tr>";
  pager += " </thead>";
  pager += "<tbody>";

  // Magic number 2
  for (var row = 2; row < entries.length; row += 1) {
    pager += "  <tr>";
    for (var col = 0; col < 4; col += 1) {
      // Maybe cache entries[1] results
      pager += "  <td data-label=\"" + GetValue(entries[1], MAP[col], "") + "\">" + GetValue(entries[row], MAP[col], "") + "</td>\n";
    }
    pager += "  </tr>";
  }

  pager += "</tbody>";
  pager += "</table>";

  return pager;
}
