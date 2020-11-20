$(document).ready(function() {
  $.getJSON('../../contents/patents.json', function(data) {
    //추후 getMembers 함수로 치환?
    Members = ["Eui-Sang Yu"];

    var items = [];
    var num_Members = Members.length;
      $.each( data, function( key, val ) {
        var Title = val.Title;
        var Link = val.Link;
        var Author = val.Authors;
        var Country = val.Country;
        var PatentNo = val.PatentNo;
        var Filed = val.Filed;
        var Issued = val.Issued;
        var AGDate = val.AGDate;

        // 저자 중 members에 underline 표기
        for (var m in Members) {
          for (var n in Author) {
            if (Author[n] == Members[m]) {
              Author[n] = "<u>" + Author[n] + "</u>";
            }
          }
        }

        items.push("<li>");
        // 특허 hyperlink가 있을 때에만 hyperlink 추가
        if (Link != "") {
          items.push("<a href='" + Link + "' target='_blank' class='Title'>" + Title + "</a>");
        }
        else {
          items.push("<div class='Title'>" + Title + "</div>");
        }

        items.push("<ul class='FullPub-detail'>");
        items.push("<li>" + Author.join(", ") + "</li>");

        // 특허 issued됐을 경우 해당 정보 추가
        if (Issued != "") {
          items.push("<li>" + Country + " " + PatentNo + ", field " + Filed + " and <span class='Issued'> issued " + Issued + "</span>.</li>");
        }
        else {
          items.push("<li>" + Country + " " + PatentNo + ", field " + Filed + ".</li>");
        }

        items.push("</ul>");
        items.push("</li>");
      });

      $( "<ol/>", {
        "class": "FullPub",
        html: items.join( "" )
      }).appendTo( '#Patents' );
    });
  return false;
});
