// const requestURL = '//color-names.herokuapp.com/v1/';
const requestURL = 'json/colorname352.json';


function palette() {
    $("#card1").css("display", "inline");
    $("#card2").css("display", "none");

}

function colors() {
    $("#card1").css("display", "none");
    $("#card2").css("display", "inline");
    document.body.style.backgroundColor = 'rgb(255, 240, 240)';
}

function complementaryColor(hexType) {
    /* 맨 앞의 "#" 기호를 삭제하기. */
    var hex = hexType.trim().replace("#", "");

    /* rgb로 각각 분리해서 배열에 담기. */
    var rgb = (3 === hex.length) ?
        hex.match(/[a-f\d]/gi) : hex.match(/[a-f\d]{2}/gi);

    rgb.forEach(function(str, x, arr) {
        /* rgb 각각의 헥사값이 한자리일 경우, 두자리로 변경하기. */
        if (str.length == 1) str = str + str;

        /* 10진수로 변환하기. */
        arr[x] = parseInt(str, 16);
    });
    // console.log(rgb[0]);
    // return "rgb(" + rgb.join(", ") + ")";

    for (i = 0; i < 3; i++) {
        rgb[i] = 255 - rgb[i];
    }
    return "rgb(" + rgb.join(", ") + ")";
    // console.log("rgb(" + rgb.join(", ") + ")")
}

// function getData1() {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', requestURL);
//     xhr.responseType = 'json';
//     xhr.onload = () => {
//         console.log(xhr.response);
//     }
//     xhr.send();

// }

function getData() {

    var palette = document.getElementById('palette');
    var koName = document.getElementById('koName');
    var enName = document.getElementById('enName');
    var hex = document.getElementById('hex');
    var color = document.getElementById('color');
    var category = document.getElementById('category');

    // console.log(koName, enName, hex, color);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', requestURL);
    // console.log(xhr);

    //   xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
    //   xhr.setRequestHeader( 'Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    //   xhr.setRequestHeader( 'Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');

    xhr.responseType = 'json';
    xhr.onload = () => {
        // console.log(xhr.response);
        var rgb = "";
        var data = xhr.response;
        console.log(data.length);
        var index = Math.floor(Math.random() * data.length);
        palette.style.setProperty('background-color', data[index].hex);
        koName.innerHTML = data[index].koName;
        enName.innerHTML = data[index].enName;
        hex.innerHTML = data[index].hex;
        color.innerHTML = data[index].color;
        category.innerHTML = data[index].category;

        // rgb = hexToRgb(data[index].hex);
        document.body.style.backgroundColor = complementaryColor(data[index].hex);
        // console.log(data[index].koName);



    };
    xhr.send();

    // $.getJSON('json/colorname352.json', function(data) {
    // //     $.each(data.person, function(i, f) {
    // //        var tblRow = "<tr>" + "<td>" + f.firstName + "</td>" +
    // //         "<td>" + f.lastName + "</td>" + "<td>" + f.job + "</td>" + "<td>" + f.roll + "</td>" + "</tr>"
    // //         $(tblRow).appendTo("#userdata tbody");
    // //   });
    // console.log(data.id);

    // });


}

function speech(id) {
    // console.log(id, value);
    // var valName = value;
    var lang = 'en-US';
    var rate = 1;
    if (String(id) == 'koTxt') {
        txt = document.getElementById('koName').innerHTML;
        lang = 'ko-KR';
        rate = 0.8;
    }
    if (String(id) == 'enTxt') {
        txt = document.getElementById('enName').innerHTML;
    }
    // if (String(id) == 'koTxt2') {
    //     // txt = document.getElementsByClassName('koTxt2').innerHTML;
    //     txt = valName;
    //     lang = 'ko-KR';
    // }
    // if (String(id) == 'enTxt2') {
    //     // txt = document.getElementsByClassName('enTxt2').innerHTML;
    //     txt = valName;
    // }



    if (!window.speechSynthesis) {
        alert("음성 재생을 지원하지 않는 브라우저입니다. 크롬, 파이어폭스 등의 최신 브라우저를 이용하세요");
        return;
    }
    const utterThis = new SpeechSynthesisUtterance(txt);


    utterThis.lang = lang;
    utterThis.pitch = 1;
    utterThis.rate = rate; //속도

    window.speechSynthesis.speak(utterThis);

}

function getList(color) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', requestURL);
    xhr.responseType = 'json';
    xhr.onload = () => {
        var data = xhr.response;


        $.each(data, function(i, f) {
            // console.log(f.hex);
            console.log(color);
            if (f.color == String(color)) {
                // var tblRow = "<tr>" + "<td><div class=" + "colorbox " + " id= " + f.hex + " /></td>" +
                //     "<td class='koTxt2' onclick='speech(this.class," + f.koName + ")'>" + f.koName + "</td>" +
                //     "<td class='enTxt2' onclick='speech(this.class," + f.enName + ")'>" + f.enName + "</td>" + "<td>" + f.hex + "</td>" + "</tr>"
                var tblRow = "<tr>" + "<td><div class=" + "colorbox " + " id= " + f.hex + " /></td>" +
                    "<td class='koList'>" + f.koName + "</td>" +
                    "<td class='enList'>" + f.enName + "</td>" + "<td>" + f.hex + "</td>" + "</tr>"
                $(tblRow).appendTo("#colorlist");
            }
        });
        var colorbox = document.getElementsByClassName('colorbox');
        for (i = 0; i < colorbox.length; i++) {
            var box = document.getElementById(colorbox[i].id);
            box.style.setProperty('background-color', colorbox[i].id);
        }

    };
    xhr.send();


}


function select() {
    var origin = document.getElementsByClassName('colorbox');
    console.log(origin.length);
    if (origin.length > 0) {
        $('#colorlist').remove();
    }
    var list = document.getElementById('categories');
    var color = list[list.selectedIndex].value;
    // console.log(color);




    console.log(colorlist);
    var colorlist = document.getElementById('colorlist');
    if (!colorlist) {
        var name = "colorlist";
        var newList = "<table id=" + name + "> </table>";
        $(newList).appendTo("#colortable");
    }
    if (String(color) == 'red') {
        document.body.style.backgroundColor = 'rgb(247, 181, 181)';
    } else if (String(color) == 'orange') {
        document.body.style.backgroundColor = 'rgb(253, 220, 159)';
    } else if (String(color) == 'blue') {
        document.body.style.backgroundColor = 'rgb(161, 184, 245)';
    } else if (String(color) == 'yellow') {
        document.body.style.backgroundColor = 'rgb(244, 245, 161)';
    } else if (String(color) == 'purple') {
        document.body.style.backgroundColor = 'rgb(204, 161, 245)';
    }
    getList(color)

}