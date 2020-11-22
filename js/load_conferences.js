$(function () {
  $.getJSON('../../contents/conferences.json', function (json) {
    var index = 1
    $.each(json.Conferences, function (key, val) {
      val.IndexNum[0] = index
      index++;

      Members = ["Eui-Sang Yu"];
      var Author = val.Authors;
      // 저자 중 members에 underline 표기
      for (var m in Members) {
        for (var n in Author) {
          if (Author[n] == Members[m]) {
            Author[n] = "<u>" + Author[n] + "</u>";
          }
        }
      }
    });

    $('#list').pagination({
      dataSource: json.Conferences,
      pageSize: 10,
      callback: function(data, pagination) {
        var wrapper = $('#list .wrapper').empty();
        $.each(data, function (key, val) {
          var Title = val.Title;
          var Author = val.Authors;
          var Conf = val.Conf;
          var ConfDur = val.ConfDur;
          var ConfLoc = val.ConfLoc;
          var ConfDate = val.ConfDate;
          var IndexNum = val.IndexNum;
          var item = [];

          item.push("<ol start='" + IndexNum + "' class='FullPub'>")
          item.push("<li><span class='Title'>" + Title + "</span>");
          item.push("<ul class='FullPub-detail'>");
          item.push("<li>" + Author.join(", ") + "</li>");
          item.push("<li><span class='Conference'>" + Conf + "</span> (" + ConfDur + "), " + ConfLoc + ".</li>");
          item.push("</ul></li></ol>")
          $('#list .wrapper').append(item.join(""));
        });
      }
    });
  });
});
