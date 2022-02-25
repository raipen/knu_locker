var a = 3;
function check(){
  var data = $("#apply").serialize();
  var result=false;
  $.ajax({
    url:'/checkStudent/',
    type:'GET',
    async: false,
    data:{name:data.name,number:data.number}
  }).done(function(data){
    data = JSON.parse(data);
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
