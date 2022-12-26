jQuery.extend(jQuery.validator.messages, {
    required: '필수 입력입니다.',
    remote: '기타입력을 입력해주세요',
    email: '이메일 주소를 올바로 입력하세요.',
    url: 'URL을 올바로 입력하세요.',
    date: '날짜가 잘못 입력됐습니다.',
    dateISO: 'ISO 형식에 맞는 날짜로 입력하세요.',
    number: '숫자만 입력하세요.',
    digits: '숫자(digits)만 입력하세요.',
    creditcard: '올바른 신용카드 번호를 입력하세요.',
    equalTo: '값이 서로 다릅니다.',
    accept: '승낙해 주세요.',
    maxlength: jQuery.validator.format('{0}글자 이상은 입력할 수 없습니다.'),
    minlength: jQuery.validator.format('적어도 {0}글자는 입력해야 합니다.'),
    rangelength: jQuery.validator.format('{0}글자 이상 {1}글자 이하로 입력해 주세요.'),
    range: jQuery.validator.format('{0}에서 {1} 사이의 값을 입력하세요.'),
    max: jQuery.validator.format('{0} 이하로 입력해 주세요.'),
    min: jQuery.validator.format('{0} 이상으로 입력해 주세요.'),
});
//기타를 체크한 경우 기타 내용이 필수가 되도록 한다.
jQuery(document).ready(function ($) {
    $('.surveyForm').validate({
        rules: {
            etcCheck: {
                required: 'input[name="info2"][value="0"]:checked',
                remote: true,
            },
            etcCheck1: {
                required: 'input[name="checkbox1"][value="0"]:checked',
            },
            etcCheck2: {
                required: 'input[name="checkbox2"][value="0"]:checked',
            },
            etcCheck3: {
                required: 'input[name="checkbox3"][value="0"]:checked',
            },
            etcCheck4: {
                required: 'input[name="checkbox4"][value="0"]:checked',
            },
            etcCheck6: {
                required: 'input[name="checkbox6"][value="0"]:checked',
            },
        },
        messages: {
            etcCheck: {
                required: '기타항목 입력을 해주세요.',
                remote: '기타항목 입력을 해주세요.',
            },
        },
    });
    $("input[name='info2']").click(function () {
        if ($("input[name='info2'][value='0']").is(':checked')) {
            $('.etcText1').val('').fadeIn();
        } else {
            $('.etcText1').fadeOut();
        }
    });
    $("input[name='checkbox1']").click(function () {
        if ($("input[name='checkbox1'][value='0']").is(':checked')) {
            $('.etcCheck1').val('').fadeIn();
        } else {
            $('.etcCheck1').fadeOut();
        }
    });
    $("input[name='checkbox2']").click(function () {
        if ($("input[name='checkbox2'][value='0']").is(':checked')) {
            $('.etcCheck2').val('').fadeIn();
        } else {
            $('.etcCheck2').fadeOut();
        }
    });
    $("input[name='checkbox3']").click(function () {
        if ($("input[name='checkbox3'][value='0']").is(':checked')) {
            $('.etcCheck3').val('').fadeIn();
        } else {
            $('.etcCheck3').fadeOut();
        }
    });
    $("input[name='checkbox4']").click(function () {
        if ($("input[name='checkbox4'][value='0']").is(':checked')) {
            $('.etcCheck4').val('').fadeIn();
        } else {
            $('.etcCheck4').fadeOut();
        }
    });
    $("input[name='checkbox6']").click(function () {
        if ($("input[name='checkbox6'][value='0']").is(':checked')) {
            $('.etcCheck6').val('').fadeIn();
        } else {
            $('.etcCheck6').fadeOut();
        }
    });
});
$.validator.setDefaults({
    submitHandler: function () {
        success();
    },
});
function success() {
    var member_uid = $('#member_uid').val();
    var companyName = $('#companyName').val();
    var userName = $('#userName').val();
    var userRank = $('#userRank').val();
    var employees = $('#employees').val();
    var info1 = $('input[name=info1]:checked').val();
    var info2 = $('input[name=info2]:checked').val();
    var info2Etc = null;
    if (info2 == 0) {
        info2Etc = $('.etcText1').val();
    }
    //1번문항
    var checkbox1 = new Array();
    $('input[name=checkbox1]:checked').each(function () {
        checkbox1.push($(this).val());
        checkbox1.sort();
    });
    var checkbox1Etc = null;
    if (checkbox1[0] == 0) {
        checkbox1Etc = $('.etcCheck1').val();
    }
    //2번문항
    var checkbox2 = new Array();
    $('input[name=checkbox2]:checked').each(function () {
        checkbox2.push($(this).val());
        checkbox2.sort();
    });
    var checkbox2Etc = null;
    if (checkbox2[0] == 0) {
        checkbox2Etc = $('.etcCheck2').val();
    }
    //3번문항
    var checkbox3 = new Array();
    $('input[name=checkbox3]:checked').each(function () {
        checkbox3.push($(this).val());
        checkbox3.sort();
    });
    var checkbox3Etc = null;
    if (checkbox3[0] == 0) {
        checkbox3Etc = $('.etcCheck3').val();
    }
    //4번문항
    var checkbox4 = new Array();
    $('input[name=checkbox4]:checked').each(function () {
        checkbox4.push($(this).val());
        checkbox4.sort();
    });
    var checkbox4Etc = null;
    if (checkbox4[0] == 0) {
        checkbox4Etc = $('.etcCheck4').val();
    }
    //5번문항
    var radio5_1 = $('input[name=radio1]:checked').val();
    var radio5_2 = $('input[name=radio2]:checked').val();
    var radio5_3 = $('input[name=radio3]:checked').val();
    var radio5_4 = $('input[name=radio4]:checked').val();
    var radio5_5 = $('input[name=radio5]:checked').val();
    var radio5_6 = $('input[name=radio6]:checked').val();
    //6번문항
    var checkbox6 = new Array();
    $('input[name=checkbox6]:checked').each(function () {
        checkbox6.push($(this).val());
        checkbox6.sort();
    });
    var checkbox6Etc = null;
    if (checkbox6[0] == 0) {
        checkbox6Etc = $('.etcCheck6').val();
    }
    //7번문항
    var textarea1 = $('#textArea6').val();
    //8번문항
    var textarea2 = $('#textArea7').val();
    var sendJsonObject = {};
    sendJsonObject.protocol = '';
    sendJsonObject.member_uid = member_uid;
    sendJsonObject.companyName = companyName;
    sendJsonObject.userName = userName;
    sendJsonObject.userRank = userRank;
    sendJsonObject.employees = employees;
    sendJsonObject.info1 = info1;
    sendJsonObject.info2 = info2;
    sendJsonObject.info2Etc = info2Etc;
    sendJsonObject.q1 = checkbox1;
    sendJsonObject.q1Etc = checkbox1Etc;
    sendJsonObject.q2 = checkbox2;
    sendJsonObject.q2Etc = checkbox2Etc;
    sendJsonObject.q3 = checkbox3;
    sendJsonObject.q3Etc = checkbox3Etc;
    sendJsonObject.q4 = checkbox4;
    sendJsonObject.q4Etc = checkbox4Etc;
    sendJsonObject.q5 = [radio5_1, radio5_2, radio5_3, radio5_4, radio5_5, radio5_6];
    sendJsonObject.q6 = checkbox6;
    sendJsonObject.q6Etc = checkbox6Etc;
    sendJsonObject.q7 = textarea1;
    sendJsonObject.q8 = textarea2;
    console.log(sendJsonObject);
}
