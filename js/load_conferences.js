$(document).ready(function() {
  $.getJSON('../../contents/conferences.json', function(data) {
    //추후 getMembers 함수로 치환?
    Members = ["Eui-Sang Yu"];

    var items = [];
    var num_Members = Members.length;
      $.each( data, function( key, val ) {
        var Title = val.Title;
        var Author = val.Authors;
        var Conf = val.Conf;
        var ConfDur = val.ConfDur;
        var ConfLoc = val.ConfLoc;
        var ConfDate = val.ConfDate;

        // 저자 중 members에 underline 표기
        for (var m in Members) {
          for (var n in Author) {
            if (Author[n] == Members[m]) {
              Author[n] = "<u>" + Author[n] + "</u>";
            }
          }
        }

        items.push("<li>");
        items.push("<div class='Title'>" + Title + "</div>");
        items.push("<ul class='FullPub-detail'>");
        items.push("<li>" + Author.join(", ") + "</li>");

        items.push("<li><span class='Conference'>" + Conf + "</span> (" + ConfDur + "), " + ConfLoc + ".</li>");

        items.push("</ul>");
        items.push("</li>");
      });

      $( "<ol/>", {
        "class": "FullPub",
        html: items.join( "" )
      }).appendTo( '#Conferences' );
    });
  return false;
});
