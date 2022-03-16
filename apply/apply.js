var a = 3;
jQuery.fn.serializeObject = function() { var obj = null; try { if(this[0].tagName && this[0].tagName.toUpperCase() == "FORM" ) { var arr = this.serializeArray(); if(arr){ obj = {}; jQuery.each(arr, function() { obj[this.name] = this.value; }); } } }catch(e) { alert(e.message); }finally {} return obj; }

function sendMail(update){
  $("#email").val($("#email1").val()+"@"+$("#email2").val());
  $("#phone_number").val($("#phone_number1").val()+"-"+$("#phone_number2").val()+"-"+$("#phone_number3").val());
  var data = $("#apply").serializeObject();
  data.update = update;
  $.ajax({
    url:'/API/combine/',
    type:'POST',
    data: data,
    async: false
  }).done(function(data){
    data = JSON.parse(data);
    console.log(data);
    $(".back_red").removeClass("back_red");
    if(!data.isOK){//데이터 형식이 잘못된 경우
      if(!data.values.name) $("#name").addClass("back_red");
      if(!data.values.id) $("#number").addClass("back_red");
      if(!data.values.phone) $(".phone").addClass("back_red");
      if(!data.values.email) $(".emailDomainForm").addClass("back_red");
      if(!data.values.want) $(".sf").addClass("back_red");
      $("#comment").text("올바르지 않는 형식입니다. 모든 값을 제대로 채워주세요");
      return false;
    }

    if(!data.studentSearch){
      $("#comment").text("명부 확인에 실패하였습니다. 이 오류가 지속된다면 학생회 총무부(카카오톡 아이디: je12370)으로 문의해주세요");
      return false;
    }

    if(!data.isStudent){
      $("#comment").text("재학생 명부에 없습니다. 학생회 총무부(카카오톡 아이디: je12370)으로 문의해주세요");
      return false;
    }

    if(!data.applySearch){
      $("#comment").text("신청정보 확인에 실패하였습니다. 이 오류가 지속된다면 학생회 총무부(카카오톡 아이디: je12370)으로 문의해주세요");
      return false;
    }

    if(data.isApplied&&data.isVerify){
      $("#comment").text("이미 신청완료된 정보가 있습니다. 변경을 원하시면 학생회 총무부(카카오톡 아이디: je12370)으로 문의해주세요.");
      return false;
    }

    if(data.isApplied&&!data.apply_success){
      $("#comment").html('이미 신청된 정보가 있습니다. 위 정보로 새로 신청하시겠습니까? <button class="btn3 btn_pink" onClick="sendMail(1)">예</button>');
      return false;
    }

    if(data.apply_success){
      $("#comment").text("신청을 완료하시려면 이메일 인증을 해주세요");
      return false;
    }else{
      $("#comment").text("신청을 실패하였습니다. 이 오류가 지속된다면 학생회 총무부(카카오톡 아이디: je12370)으로 문의해주세요");
      return false;
    }
    // if(data.success){
    //   if(!data.isStudent){
    //     $("#comment").text("명부에 등록되지 않은 정보입니다. 학생회 총무부 000 카카오톡 아이디 je12370으로 문의해주세요");
    //   }
    //   else if(data.apply_success){
    //     $("#comment").text("신청을 완료하시려면 이메일 인증을 해주세요");
    //   }
    // }else{
    //   $("#comment").text("오류입니다. 관리자에게 연락해주세요");
    // }
  });
  return false;
}

$(document).ready(function(){
  $(".floor_select").on("change",function(){
    console.log($(this).val());
    switch($(this).val()){
      case "-1":
      console.log(-1);
      $("#height_select"+$(this).attr('id')[12]).html(`
      <option value="1" selected>상</option>
      <option value="2" >중상</option>
      <option value="3" >중</option>
      <option value="4" >중하</option>
      <option value="5" >하</option>`);
      break;
      case "1":
      console.log(1);
      $("#height_select"+$(this).attr('id')[12]).html(`
        <option value="1" selected>상</option>
        <option value="2" >중상</option>
        <option value="3" >중하</option>
        <option value="4" >하</option>`);
      break;
      case "3":
      console.log(3);
      $("#height_select"+$(this).attr('id')[12]).html(`
        <option value="1" selected>상</option>
        <option value="2" >중상</option>
        <option value="3" >중하</option>
        <option value="4" >하</option>`);
      break;
    }
    console.log($(this).attr('id'));
  });
  // $(".point").click(function(){
  //   $(this).parent().children(".detail_option").toggleClass("on");
  // });
});
