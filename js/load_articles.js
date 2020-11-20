$(document).ready(function() {
  $.getJSON('../contents/articles.json', function(data) {
    //추후 getMembers 함수로 치환?
    Members = ["Eui-Sang Yu"];

    var items = [];
    var num_Members = Members.length;
      $.each( data, function( key, val ) {
        var Title = val.Title;
        var Link = val.Link;
        var FirstAuthor = val.Authors[0].FirstAuthor;
        var CoAuthor = val.Authors[0].CoAuthor;
        var CorresAuthor = val.Authors[0].CorresAuthor;
        var Journal = val.Journal;
        var Detail = val.Detail;
        var PubDate = val.PubDate;

        // 저자 중 members에 underline 표기
        for (var m in Members) {
          for (var n in FirstAuthor) {
            if (FirstAuthor[n] == Members[m]) {
              FirstAuthor[n] = "<u>" + FirstAuthor[n] + "</u>";
            }
          }
          for (var n in CoAuthor) {
            if (CoAuthor[n] == Members[m]) {
              CoAuthor[n] = "<u>" + CoAuthor[n] + "</u>";
            }
          }
          for (var n in CorresAuthor) {
            if (CorresAuthor[n] == Members[m]) {
              CorresAuthor[n] = "<u>" + CorresAuthor[n] + "</u>";
            }
          }
        }

        // Corresponding Author에 * 표기
        for (var n in CorresAuthor) {
          CorresAuthor[n] = CorresAuthor[n] + "*";
        }

        items.push("<li>");
        // 저널이 Submitted이 아닐 때에만 hyperlink 추가
        if (Journal == "Submitted") {
          items.push("<div class='Title'>" + Title + "</div>");
        }
        else {
          items.push("<a href='" + Link + "' target='_blank' class='Title'>" + Title + "</a>");
        }

        // First Author가 여러명이면 Contribution을 표기
        items.push("<ul class='FullPub-detail'>");
        if (FirstAuthor.length == 1) {
          items.push("<li>" + FirstAuthor + ", " + CoAuthor.join(", ") + ", " + CorresAuthor.join(", ") + "</li>");
        }
        else if (FirstAuthor.length > 1) {
          items.push("<li>" + FirstAuthor.join("<sup>&#167;</sup>, ") + "<sup>&#167;</sup>, " + CoAuthor.join(", ") + ", " + CorresAuthor.join(", ") + " (<sup>&#167;</sup>These authors contributed equally)</li>");
        }

        // Submitted일 경우 Detial 생략
        if (Journal == "Submitted") {
          items.push("<li><span class='Journal'>" + Journal + "</span>.</li>");
        }
        else {
          items.push("<li><span class='Journal'>" + Journal + "</span>, " + Detail + ".</li>");
        }

        items.push("</ul>");
        items.push("</li>");
      });

      $( "<ol/>", {
        "class": "FullPub",
        html: items.join( "" )
      }).appendTo( '#Articles' );
    });
  return false;
});
