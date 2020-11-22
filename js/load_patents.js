$(function () {
  $.getJSON('../../contents/patents.json', function (json) {
    var index = 1
    $.each(json.Patents, function (key, val) {
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
      dataSource: json.Patents,
      pageSize: 10,
      callback: function(data, pagination) {
        var wrapper = $('#list .wrapper').empty();
        $.each(data, function (key, val) {
          var Title = val.Title;
          var Link = val.Link;
          var Author = val.Authors;
          var Country = val.Country;
          var PatentNo = val.PatentNo;
          var Filed = val.Filed;
          var Issued = val.Issued;
          var AGDate = val.AGDate;
          var IndexNum = val.IndexNum;
          var item = [];

          item.push("<ol start='" + IndexNum + "' class='FullPub'>")
          if (Link != "") {
            item.push("<li><a href='" + Link + "' target='_blank' class='Title'>" + Title + "</a>");
          }
          else {
            item.push("<li><div class='Title'>" + Title + "</div>");
          }
          item.push("<ul class='FullPub-detail'>");
          item.push("<li>" + Author.join(", ") + "</li>");
          // 특허 issued됐을 경우 해당 정보 추가
          if (Issued != "") {
            item.push("<li>" + Country + " " + PatentNo + ", field " + Filed + " and <span class='Issued'> issued " + Issued + "</span>.</li>");
          }
          else {
            item.push("<li>" + Country + " " + PatentNo + ", field " + Filed + ".</li>");
          }
          item.push("</ul></li></ol>")
          $('#list .wrapper').append(item.join(""));
        });
      }
    });
  });
});
