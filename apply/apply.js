var a = 3;
jQuery.fn.serializeObject = function() { var obj = null; try { if(this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) { var arr = this.serializeArray(); if(arr){ obj = {}; jQuery.each(arr, function() { obj[this.name] = this.value; }); } } }catch(e) { alert(e.message); }finally {} return obj; }

function check(){
  $("#email").val($("#email1").val()+"@"+$("#email2").val());
  var data = $("#apply").serialize();
  var result=false;
  $.ajax({
    url:'/API/checkStudent/?'+data,
    type:'GET',
    async: false
  }).done(function(data){
    data = JSON.parse(data);
    console.log(data);
    if(data.success){
      if(data.isStudent) result = true;
      else{
        $("#comment").text("명부에 등록되지 않은 정보입니다. 학생회 총무부 000 카카오톡 아이디 000000으로 문의해주세요");
      }
    }else{
      $("#comment").text("오류입니다. 관리자에게 연락해주세요");
    }
  });
  return result;
}

function sendMail(){
  $("#email").val($("#email1").val()+"@"+$("#email2").val());
  var data = $("#apply").serializeObject();
  $.ajax({
    url:'/API/sendMail/',
    type:'POST',
    data: data,
    async: false
  }).done(function(data){
    data = JSON.parse(data);
    console.log(data);
    // if(data.success){
    //   if(data.isStudent) result = true;
    //   else{
    //     $("#comment").text("명부에 등록되지 않은 정보입니다. 학생회 총무부 000 카카오톡 아이디 000000으로 문의해주세요");
    //   }
    // }else{
    //   $("#comment").text("오류입니다. 관리자에게 연락해주세요");
    // }
  });
}
