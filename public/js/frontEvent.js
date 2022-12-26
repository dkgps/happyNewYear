'use strict';

// 익스플로러 remove메소드
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
var stopScrollEvent = true;
//클래스 on off
var count = 0;
var classToggle = function classToggle(e, className, eventClass, num) {
    if (eventClass != null) {
        //변형 토글 버튼
        var targetTag = document.querySelector('.' + eventClass);
        console.log(targetTag);
        count++;
        count = count % 2;
        if (count == 1) {
            e.classList.add(className);
            $(targetTag).fadeIn();
            $(targetTag).children().stop().animate({ right: '0' });
            $('body').css('overflow', 'hidden');
        } else {
            e.classList.remove(className);
            $(targetTag).fadeOut();
            $(targetTag).children().stop().animate({ right: '-320px' });
            $('body').css('overflow', 'auto');
        }
        
    } else {
        //일반 토글 버튼
        count++;
        count = count % 2;
        if (count == 1) {
            e.classList.add(className);
        } else {
            e.classList.remove(className);
        }
    }
};

var closeBtn = function closeBtn() {
    var targetTag = document.querySelector('.hiddenMenuWrap');
    count = 0;
    $('.mobMenuBtn ').removeClass('expanded');
    $('.hiddenMenu').stop().animate({ right: '-100vw' });
    $('body').css('overflow', 'auto');
    $('.hiddenMenuWrap').fadeOut();
};
function backClose()
{
    $('.mobMenuBtn ').removeClass('expanded');
}
function backOpen()
{
    $('.selectBack3').fadeIn();
}
$(window).resize(function () {
    if ($(window).outerWidth() > 926) {
        closeBtn();
    }
});


//---------------------------------------------
//커스텀 모달
//type: (모달타입)Number
//1: 커스텀 confirm
//2: 커스텀 alert
//3:
//4:
//5 ~ : 자유모달
//title: (모달제목)String
//desc: (모달내용)String
//func: (모달내부 버튼함수)String

//버튼에 추가 할 이벤트  onclick="customModal(타입,제목,내용,함수)"
//함수가 넣어질 클래스버튼 <button class="funcBtn" onclick=""></button>\
//닫기가 넣어질 클래스버튼 <button class="closeBtn" onclick=""></button>
//---------------------------------------------
function customModal(type, title, desc, func, jsonData, target) {
    //jsonData 존재할경우 문자열로 넘어온 객체 파싱
    if (jsonData) {
        jsonData = JSON.parse(jsonData);
    }

    $('body').css('overflow', 'hidden');

    if (type == 1 || type == 2) {
        $('.modal' + type).fadeIn();
        $('.modal' + type).find('h3').html(title);
        $('.modal' + type).find('p').html(desc);

        if(func)
        {
            if (type == 1) {
                $('.funcBtn').attr('onclick', func + '()');
            }
            else
            {
                $('.closeBtn').attr('onclick', 'customModalClose(' + type + '),'+func + '()');
            }
        }
        else
        {
            $('.closeBtn').attr('onclick', 'customModalClose(' + type + ')');
        }

        stopScrollEvent = false;
        
    } else if (type == 3) {
        //고정모달 넣기

    } else if (type == 4) {
        //고정모달 넣기
    }
    else if (type == 998) {//IR STAGE 영상팝업
        stopScrollEvent = false;
        $('.modal998').fadeIn();
        $('.modal998').find('.removeSrc').attr('src', title);

        var sendJsonObject = {};
        sendJsonObject.protocol = 'addPageLog';
        sendJsonObject.data = JSON.stringify({companyUID: desc, type:'viewPrVideoExhibitorPage'});
        protocolSendAjax(sendJsonObject, false, 'none');
    }
    else if (type == 999) {//meetingExhibitor 영상팝업
        stopScrollEvent = false;
        $('.modal999').fadeIn();
        $('.modal999').find('.removeSrc').attr('src', title);
        $('.modal999 .xBtn').append('<button id="videoPause" class="closeBtn" onclick="customModalClose(999)"><img src="/web/img/close.png" alt="" /></button>');

        var sendJsonObject = {};
        sendJsonObject.protocol = 'addPageLog';
        sendJsonObject.data = JSON.stringify({companyUID: desc, type:'viewPrVideoExhibitorPage'});
        protocolSendAjax(sendJsonObject, false, 'none');
    }
    // else if (type == 10) {
    //     console.log(func);
    //     if (func == 'view') {
    //         stopScrollEvent = false;
    //         $('.modal' + type).fadeIn();
    //         $('.modal' + type).find('.removeSrc').attr('src', title);
    //         $('.modal' + type).find('.modalImg').attr('src', desc);
    //     } else {
    //         $('body').css('overflow', 'auto');
    //         alert('Conference open at 10:00 AM (KST) by date.');
    //     }
    // }
    else {
        //자유모달
        stopScrollEvent = false;
        $('.modal' + type).fadeIn();
    }
}
function customModalClose(type) {
    $('body').css('overflow', 'auto');
    stopScrollEvent = true;
    $('.modal').fadeOut();
    if (type == 1 || type == 2) {
        setTimeout(function () {
            $('.modal' + type).find('h3').html('');
            $('.modal' + type).find('p').html('');
            $('.funcBtn').attr('onclick', '');
        }, 300);
    }
    else if (type == 13) {
        $('.modal13 .closeBtn img').attr('src', '/web/img/close.png');
    }
    $('.removeSrc').attr('src', '');
}
//---------------------------------------------

//아이디 쿠키 불러오기
function getCookie(cookie_name) {
    var x = void 0,
        y = void 0;
    var val = document.cookie.split(';');

    for (var i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
        if (x == cookie_name) {
            return unescape(y); // unescape로 디코딩 후 값 리턴
        }
    }
}
function setCookie(cookie_name, value, days) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + days);
    // 설정 일수만큼 현재시간에 만료값으로 지정
    var cookie_value = escape(value) + (days == null ? '' : '; expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value;
}

// 모바일 헤더 메뉴 보여주기
// var startDate = new Date("2021/03/22 10:00:00");

// if (Date.now() >= startDate) {
//     $('.hiddenMenu .menuBody').css('display', 'block');
// }