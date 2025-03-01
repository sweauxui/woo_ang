$.ajax({
    url: '../W_js/여객편(주간운항)현황_도착.json', // 읽어올 문서
    type: 'GET', // 방식
    dataType: 'json', // 문서 타입
    timeout: 1000, // 시간 설정
    error: function () { // 로딩 에러시
        alert('Error');
    },
    success: function (response) {
        var arrival01 = response.response.body.items;

        let allAirport = arrival01.map(function (e) { return e.airport; });
        let setAirport = [...new Set(allAirport)]; //중복제거

        let airport_option = document.arrival_schedule_option01.airport_option;
        for (var property in setAirport) {
            airport_option.add(new Option(`${setAirport[property]}`, `${setAirport[property]}`));
        }
        let setSDTime = arrival01.map(function (e) { return e.scheduleDateTime; });
            setSDTime = [...new Set(setSDTime)]; //중복제거
        let scheduleDTime_option = document.arrival_schedule_option01.scheduleDateTime_option;

        //scheduleDateTime, 출발 년월일 쪼개기
        for (var property in setSDTime) {
            // scheduleDTime_option.add(new Option(`셀렉트박스에서 보여지는부분`, `데이터값`));
            let 연도 = `${setSDTime[property]}`.substring('0', '4');
            let 월 = `${setSDTime[property]}`.substring('4', '6');
            let 일 = `${setSDTime[property]}`.substring('6', '8');
            let 시 = `${setSDTime[property]}`.substring('8', '10');
            let 분 = `${setSDTime[property]}`.substring('10', '12');
            // let 컷팅시간대 = `${setSDTime[property]}`.split();
            // console.log(연도)
            scheduleDTime_option.add(new Option(`${연도}년 ${월}월 ${일}일 ${시}시 ${분}분`, `${setSDTime[property]}`));

                let test = arrival01.map(function (e) { return e.scheduleDateTime; });

                let test01 = `${test[property]}`.substring('0','8'); //연도와 날짜만 출력
                let test02 =  test01.indexOf('20230311','0') // 20230311 아닌건 -1 로 출력 
                // console.log(test02)

                // console.log(test02)
                

            //     // var now = new Date();	// 현재 날짜 및 시간
            //     // var today = new Date();
            //     // var today_fullYear = today.getFullYear();
            //     // var today_month = today.getMonth();
            //     // var today_date = today.getDate();

            //12자리 yyyymmddhhmm //split
            // scheduleDTime_option.add(new Option(`${컷팅시간대}`, `${setSDTime[property]}`));
            // scheduleDTime_option.add(new Option(`${setSDTime[property]}`, `${setSDTime[property]}`));
        }

        let allAirline = arrival01.map(function (e) { return e.airline; });
        let setAirline = [...new Set(allAirline)]; //중복제거
        let Airline_option = document.arrival_schedule_option01.airline_option;
        //scheduleDateTime, 출발시간, 옵션추가
        for (var property in setAirline) {
            Airline_option.add(new Option(`${setAirline[property]}`, `${setAirline[property]}`));
        }
        //airport, 출발지, 돌리기
        $(document).on('change', 'select[name=airport_option], select[name=airline_option]', function () {
            //1차결과는 공항과 항공사의 앤드조건검색결과
            var arrivalAirport = $('select[name=airport_option]').val();
            var arrivalAirline = $('select[name=airline_option]').val();
            var selectAirportAirline = arrival01
                                        .filter(e => e.airport === arrivalAirport)
                                        .filter(e => e.airline === arrivalAirline)

            var elem = '';
            $.each(selectAirportAirline, function () {
                elem += `<tr>`;
                elem += `<td class="scheduleDateTime01_atb">${this.scheduleDateTime}</td>`;
                elem += `<td class="airport01_atb">${this.airport}</td>`;
                elem += `<td class="airline01_atb">${this.airline} - ${this.flightId}</td>`;
                elem += `<td class="terminalid01_atb">${this.terminalid}</td>`;
                elem += `<td class="gatenumber01_atb">${this.gatenumber}</td>`;
                elem += `<td class="exitnumber01_atb">${this.carousel}</td>`;
                elem += `<td class="exitnumber01_atb">${this.exitnumber}</td>`;
                elem += `<td class="remark01_atb">${this.remark}</td>`;
                elem += `<td class="news01_atb"> - </td>`;
                elem += `</tr>`;
            });
            $(".arrival01_tb table tbody").empty().append(elem);

            $(document).on('change', 'select[name=scheduleDateTime_option]', function () {
                // 2차결과는 1차결과에서 시간선택
                var arrivalSchedule = $('select[name=scheduleDateTime_option]').val();
                var selectAirportAirlineSchedule = selectAirportAirline.filter(e => e.scheduleDateTime === arrivalSchedule)
    
                var elem = '';
                $.each(selectAirportAirlineSchedule, function () {
                    elem += `<tr>`;
                    elem += `<td class="scheduleDateTime01_atb">${this.scheduleDateTime}</td>`;
                    elem += `<td class="airport01_atb">${this.airport}</td>`;
                    elem += `<td class="airline01_atb">${this.airline} - ${this.flightId}</td>`;
                    elem += `<td class="terminalid01_atb">${this.terminalid}</td>`;
                    elem += `<td class="gatenumber01_atb">${this.gatenumber}</td>`;
                    elem += `<td class="exitnumber01_atb">${this.carousel}</td>`;
                    elem += `<td class="exitnumber01_atb">${this.exitnumber}</td>`;
                    elem += `<td class="remark01_atb">${this.remark}</td>`;
                    elem += `<td class="news01_atb"> - </td>`;
                    elem += `</tr>`;
                });
                $(".arrival01_tb table tbody").empty().append(elem);
            });
        });
        $('select[name=airline_option]').change();
    }
});

// 여객 도착 정기 운항편(최초)

//여객편 정기운항편일정_도착
$.ajax({
    url: '../W_js/여객편(정기운항편)일정_도착2.json', // 읽어올 문서
    type: 'GET', // 방식
    dataType: 'json', // 문서 타입
    timeout: 1000, // 시간 설정
    error: function () { // 로딩 에러시
        alert('Error');
    },
    success: function (response) {
        var arrival02 = response.response.body.items;
        // console.log(arrival02);

        //46줄 시작
        //원하는 출발지 값만 밀어넣기
        let allAirport = arrival02.map(function (e) { return e.airport; }); //출발지 추출
        let setAirport = [...new Set(allAirport)]; //중복제거

        let selectBox_name01 = document.arrival02_option.selectBox_name01;
        for (var property in setAirport) {
            //   console.log(`${setAirport[property]}`);
            selectBox_name01.add(new Option(`${setAirport[property]}`, `${setAirport[property]}`));
        }// 기능은 class가 아니라 
        //(html134~135줄) name으로 해야함.
        // 일반적인 메서드는 정적 이벤트용, 이벤트를 동적으로 처리할 때는 .on('이벤트명', '선택자', 함수)을 사용한다.
        $(document).on('change', 'select[name=selectBox_name01]', function () {
            var arrivalAirport02 = $(this).val();
            var selectAirport = arrival02.filter(e => e.airport === arrivalAirport02);

            var elem = '';
            $.each(selectAirport, function () {
                elem += `<tr>`;
                elem += `<td class="flightid">${this.flightid}</td>`;
                elem += `<td class="airline">${this.airline}</td>`;
                elem += `<td class="scheduleDateTime"></td>`;
                elem += `<td class="airport">${this.airport}</td>`;
                elem += `<td class="terminalid">${this.terminalid}</td>`;
                elem += `<td class="week_sub">`;
                if (`${this.monday}` !== 'Y') { elem += `<div class="off">${this.monday}</div>`; }
                else { elem += `<div>${this.monday}<i class="fa-solid fa-plane-departure"></i></div>`; } //월
                if (`${this.tuesday}` !== 'Y') { elem += `<div class="off">${this.tuesday}</div>`; }
                else { elem += `<div>${this.tuesday}<i class="fa-solid fa-plane-departure"></i></div>`; } //화
                if (`${this.wednesday}` !== 'Y') { elem += `<div class="off">${this.wednesday}</div>`; }
                else { elem += `<div>${this.wednesday}<i class="fa-solid fa-plane-departure"></i></div>`; } //수
                if (`${this.thursday}` !== 'Y') { elem += `<div class="off">${this.thursday}</div>`; }
                else { elem += `<div>${this.thursday}<i class="fa-solid fa-plane-departure"></i></div>`; }//목
                if (`${this.friday}` !== 'Y') { elem += `<div class="off">${this.friday}</div>`; }
                else { elem += `<div>${this.friday}<i class="fa-solid fa-plane-departure"></i></div>`; }//금
                if (`${this.saturday}` !== 'Y') { elem += `<div class="off">${this.saturday}</div>`; }
                else { elem += `<div>${this.saturday}<i class="fa-solid fa-plane-departure"></i></div>`; }//토
                if (`${this.sunday}` !== 'Y') { elem += `<div class="off">${this.sunday}</div>`; }
                else { elem += `<div>${this.sunday}<i class="fa-solid fa-plane-departure"></i></div>`; }//일
                elem += `</td>`;
                elem += `<td class="bodydate">${this.firstdate} ~ ${this.lastdate}</td>`; //운항시작일 ~ 종료일
                elem += `</tr>`;
            });
            $(".arrival02_tb table tbody").empty().append(elem);

            function flightCode(n) {
                let code = arrival02[n].flightid;
                return code;
            }
            // 항공편명 뽑는 함수

            // 여객편 주간운항현황_도착 파일을 통해서 도착시간, 터미널
            $.ajax({
                url: '../W_js/여객편(주간운항)현황_도착.json', // 읽어올 문서
                type: 'GET', // 방식
                dataType: 'json', // 문서 타입
                timeout: 1000, // 시간 설정
                error: function () { // 로딩 에러시
                    alert('Error');
                },
                success: function (response) {
                    const weekAirplain = response.response.body.items; //해당 객체 let terminalid 배열임
                    // console.log(weekAirplain[38])
                    $.each(selectAirport, function (index) {// each가 도는 횟수는 위에서 원하는 출발지만 추출한 결과수랑 같다
                        let toflightid = flightCode(index); // 일정데이터의 항공편명을 뽑아 현황데이터랑 편명동기화
                        let findFlightidIndex = weekAirplain.map(function (e) { return e.flightId; }).indexOf(toflightid); //현황데이터에서 편명으로 검색하여 인덱스 번호 추출

                        let scheduleDateTime = weekAirplain[findFlightidIndex].scheduleDateTime; //현황데이터에서편명인덱스에 맞는 스케쥴 추출
                        let terminalid = weekAirplain[findFlightidIndex].terminalid; //현황데이터에서편명인덱스에 맞는 터미널 추출
                        $('.arrival02_tb table tbody tr').eq(index).children('td:nth-child(3)').text(scheduleDateTime);
                        $('.arrival02_tb table tbody tr').eq(index).children('td:nth-child(5)').text(terminalid);
                    });
                }
            });
        });
        $('select[name=selectBox_name01]').change(); // 최초로딩시 초기값 콜링하기 위해 셀렉트 강제실행


        // function Airline(n) {
        //     let code = arrival02[n].airline;
        //     return code;
        // }
    }
});


// 여객 출발 시간표
// $.ajax({
//     url: '../W_js/여객편(주간운항)현황_출발.json', // 읽어올 문서
//     type: 'GET', // 방식
//     dataType: 'json', // 문서 타입
//     timeout: 1000, // 시간 설정
//     error: function () { // 로딩 에러시
//         alert('Error');
//     },
//     success: function (response) {

//         var departure01 = response.response.body.items;

//         var elem = '';
//         $.each(departure01, function () {
//             elem += `<tr>`;
//             elem += `<td class="scheduleDateTime01_dtb">${this.scheduleDateTime}</td>`;
//             elem += `<td class="airport01_dtb">${this.airport}</td>`;
//             elem += `<td class="airline01_dtb">${this.airline} - ${this.flightId}</td>`;
//             elem += `<td class="terminalid01_dtb">${this.terminalid}</td>`;
//             elem += `<td class="chkinrange01_dtb">${this.chkinrange}</td>`;
//             elem += `<td class="gatenumber01_dtb">${this.gatenumber}</td>`;
//             elem += `<td class="remark01_dtb">${this.remark}</td>`;
//             elem += `<td> - </td>`;
//             elem += `</tr>`;
//         });

//         $(".departure01_tb table tbody").empty().append(elem); //여기 부활 시키기
//     }
// });

// // 여객 출발 정기 운항편
// $.ajax({
//     url: '../W_js/여객편(정기운항편)일정_출발.json', // 읽어올 문서
//     type: 'GET', // 방식
//     dataType: 'json', // 문서 타입
//     timeout: 1000, // 시간 설정
//     error: function () { // 로딩 에러시
//         alert('Error');
//     },
//     success: function (response) {
//         var departure02 = response.response.body.items;
//         console.log(departure02);
//         var elem = '';
//         let allAirport = departure02.map(function (e) { return e.airport; }); //출발지 추출
//         let setAirport = [...new Set(allAirport)]; //중복제거

//         let selectBox_name02 = document.정기운항02.selectBox_name02;
//         for (var property in setAirport) {
//             //   console.log(`${setAirport[property]}`);
//             selectBox_name02.add(new Option(`${setAirport[property]}`, `${setAirport[property]}`));
//         }// 기능은 class가 아니라 
//         //(html134~135줄) name으로 해야함.

//         // 일반적인 메서드는 정적 이벤트용, 이벤트를 동적으로 처리할 때는 .on('이벤트명', '선택자', 함수)을 사용한다.
//         $(document).on('change', 'select[name=selectBox_name02]', function () {
//             var 출발공항 = $(this).val();
//             var selectAirport = departure02.filter(e => e.airport === 출발공항);

//             $.each(selectAirport, function () {
//                 elem += `<tr>`;
//                 elem += `<td class="flightid">${this.flightid}</td>`;
//                 elem += `<td class="airline">${this.airline}</td>`;
//                 elem += `<td class="scheduleDateTime"></td>`;
//                 elem += `<td class="airport">${this.airport}</td>`;
//                 elem += `<td class="terminalid">${this.terminalid}</td>`;
//                 elem += `<td class="week_sub">`;
//                 if (`${this.monday}` !== 'Y') { elem += `<div class="off">${this.monday}</div>`; }
//                 else { elem += `<div>${this.monday}<i class="fa-solid fa-plane-departure"></i></div>`; } //월
//                 if (`${this.tuesday}` !== 'Y') { elem += `<div class="off">${this.tuesday}</div>`; }
//                 else { elem += `<div>${this.tuesday}<i class="fa-solid fa-plane-departure"></i></div>`; } //화
//                 if (`${this.wednesday}` !== 'Y') { elem += `<div class="off">${this.wednesday}</div>`; }
//                 else { elem += `<div>${this.wednesday}<i class="fa-solid fa-plane-departure"></i></div>`; } //수
//                 if (`${this.thursday}` !== 'Y') { elem += `<div class="off">${this.thursday}</div>`; }
//                 else { elem += `<div>${this.thursday}<i class="fa-solid fa-plane-departure"></i></div>`; }//목
//                 if (`${this.friday}` !== 'Y') { elem += `<div class="off">${this.friday}</div>`; }
//                 else { elem += `<div>${this.friday}<i class="fa-solid fa-plane-departure"></i></div>`; }//금
//                 if (`${this.saturday}` !== 'Y') { elem += `<div class="off">${this.saturday}</div>`; }
//                 else { elem += `<div>${this.saturday}<i class="fa-solid fa-plane-departure"></i></div>`; }//토
//                 if (`${this.sunday}` !== 'Y') { elem += `<div class="off">${this.sunday}</div>`; }
//                 else { elem += `<div>${this.sunday}<i class="fa-solid fa-plane-departure"></i></div>`; }//일
//                 elem += `</td>`;
//                 elem += `<td class="bodydate">${this.firstdate} ~ ${this.lastdate}</td>`; //운항시작일 ~ 종료일
//                 elem += `</tr>`;
//             });
//             $(".departure02_tb table tbody").empty().append(elem);

//             function flightCode(n) {
//                 let code = departure02[n].flightid;
//                 return code;
//             }
//             // 항공편명 뽑는 함수

//             // 여객편 주간운항현황_도착 파일을 통해서 도착시간, 터미널
//             $.ajax({
//                 url: '../W_js/여객편(주간운항)현황_출발.json', // 읽어올 문서
//                 type: 'GET', // 방식
//                 dataType: 'json', // 문서 타입
//                 timeout: 1000, // 시간 설정
//                 error: function () { // 로딩 에러시
//                     alert('Error');
//                 },
//                 success: function (response) {
//                     const weekAirplain = response.response.body.items; //해당 객체 let terminalid 배열임
//                     // console.log(weekAirplain[38])
//                     $.each(selectAirport, function (index) {// each가 도는 횟수는 위에서 원하는 출발지만 추출한 결과수랑 같다
//                         let toflightid = flightCode(index); // 일정데이터의 항공편명을 뽑아 현황데이터랑 편명동기화
//                         let findFlightidIndex = weekAirplain.map(function (e) { return e.flightId; }).indexOf(toflightid); //현황데이터에서 편명으로 검색하여 인덱스 번호 추출

//                         let scheduleDateTime = weekAirplain[findFlightidIndex].scheduleDateTime; //현황데이터에서편명인덱스에 맞는 스케쥴 추출
//                         let terminalid = weekAirplain[findFlightidIndex].terminalid; //현황데이터에서편명인덱스에 맞는 터미널 추출
//                         $('.departure02_tb table tbody tr').eq(index).children('td:nth-child(3)').text(scheduleDateTime);
//                         $('.departure02_tb table tbody tr').eq(index).children('td:nth-child(5)').text(terminalid);
//                     });
//                 }
//             });
//         });
//         $('select[name=selectBox_name02]').change(); // 최초로딩시 초기값 콜링하기 위해 셀렉트 강제실행
//     }
// });




//정기 업데이트 필요한 json (2주 간격)
// #인천국제공항공사_여객편 주간 운항 현황 = 출 도착, 터미널정보, 편명, 항공사, 수취대번호, 체크인 카운터
// 인천국제공항공사_여객기 정기운항편 일정 정보(출,도착) = 요일 정보, 항공기 정기 운항정보
//주기적으로 업데이트 필요 x
// #인천국제공항공사_취항 항공사 현황 조회 = 로고, 로고url

// # 인천국제공항공사_기상 정보
// 여객비행기운항정보(항공사명, 편명, 예정시간, 변경시간, 소요시간,
// 출발공항, 탑승구, 수하물수취대, 출구, 현황(도착/출발,결항,지연,회항,착륙),
// 날씨 현황(출발도시,도착도시)) 를 조회 해당일로 나타내는 여객편운항현황 정보 서비스

// +   전체 터미널 정보 P01:제1터미널,P02:탑승동,P03:제2터미널,C01:화물터미널 남측,C02:화물터미널 북측,C03:제2화물터미널

// ---출발시간/ 항공사/ 터미널 정보/ 탑승구 번호/ 출발 현황/ 기상 정보/ 출구번호/ 수하물 수취대 번호



// 탭
$(function () {
    $('.도착').click(function () {
        $('.departure').addClass('on').siblings().removeClass('on');
    });
    $('.출발').click(function () {
        $('.arrival').addClass('on').siblings().removeClass('on');
    });
    $('.도착').trigger('click'); //도착이 눌린 상태로 시작하겠다
});

$(function () {
    //도착내부 탭
    $('.도착시간표').click(function () {
        $('.arrival02').addClass('on').siblings().removeClass('on');
    });
    $('.도착정기운항편').click(function () {
        $('.arrival01').addClass('on').siblings().removeClass('on');
    });
    $('.도착시간표').trigger('click'); //도착시간표가 눌린 상태로 시작하겠다
});

$(function () {
    // 출발 내부 탭
    $('.출발시간표').click(function () {
        $('.departure02').addClass('on').siblings().removeClass('on');
    });
    $('.출발정기운항편').click(function () {
        $('.departure01').addClass('on').siblings().removeClass('on');
    });
    $('.출발시간표').trigger('click'); //출발시간표가 눌린 상태로 시작하겠다
});


//으악 

