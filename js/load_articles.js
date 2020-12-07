$(function () {
  $.getJSON('../contents/articles.json', function (json) {
    var index = 1
    $.each(json.Articles, function (key, val) {
      val.IndexNum[0] = index
      index++;

      Members = ["Eui-Sang Yu"];
      var FirstAuthor = val.Authors[0].FirstAuthor;
      var CoAuthor = val.Authors[0].CoAuthor;
      var CorresAuthor = val.Authors[0].CorresAuthor;
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
    });

    $('#list').pagination({
      dataSource: json.Articles,
      pageSize: 10,
      callback: function(data, pagination) {
        var wrapper = $('#list .wrapper').empty();
        var item = [];
        var olStart = 0;
        $.each(data, function (key, val) {
          var Title = val.Title;
          var Link = val.Link;
          var FirstAuthor = val.Authors[0].FirstAuthor;
          var CoAuthor = val.Authors[0].CoAuthor;
          var CorresAuthor = val.Authors[0].CorresAuthor;
          var Journal = val.Journal;
          var Detail = val.Detail;
          var PubDate = val.PubDate;
          var IndexNum = val.IndexNum;
          // ordered list 자동 계산
          if (olStart == 0) {
            olStart = IndexNum
          }

          // Link가 있을 때에만 hyperlink 추가
          if (Link != "") {
            item.push("<li><a href='" + Link + "' target='_blank' class='Title'>" + Title + "</a>");
          }
          else {
            item.push("<li><div class='Title'>" + Title + "</div>");
          }
          // First Author가 여러명이면 Contribution을 표기
          item.push("<ul class='FullPub-detail'>");
          if (FirstAuthor.length == 1) {
            item.push("<li>" + FirstAuthor + ", " + CoAuthor.join(", ") + ", " + CorresAuthor.join(", ") + "</li>");
          }
          else if (FirstAuthor.length > 1) {
            item.push("<li>" + FirstAuthor.join("<sup>&#167;</sup>, ") + "<sup>&#167;</sup>, " + CoAuthor.join(", ") + ", " + CorresAuthor.join(", ") + " (<sup>&#167;</sup>These authors contributed equally)</li>");
          }
          // Detail 있을 때에만 추가
          if (Detail != "") {
            item.push("<li><span class='Journal'>" + Journal + "</span>, " + Detail + ".</li>");
          }
          else {
            item.push("<li><span class='Journal'>" + Journal + "</span>.</li>");
          }
          item.push("</ul></li>")

        });
        $('#list .wrapper').append("<ol start='" + olStart + "' class='FullPub' >"+item.join("")+"</ol>");
      }
    });
  });
});
