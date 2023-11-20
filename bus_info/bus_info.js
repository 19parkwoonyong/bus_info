document.getElementById('fetchDataBtn').addEventListener('click', function () {
    var vehID = document.getElementById('vehID').value;
    fetchbusData(vehID);
});

function handleType(busType){
    var outputElement = document.getElementById('busType');

    if (busType === 0) {
        outputElement.innerHTML = '<p>일반버스<p>' ;
    } else if (busType ===1) {
        outputElement.innerHTML = '<p>저상버스<p>' ;
    } else {
        outputElement.innerHTML = '<p>굴절버스<p>' ;
    }
}

function handleCongetion(congetion){
    var outputElement = document.getElementById('congetion');

    if (congetion >= 0 && congetion <= 5) {
        outputElement.innerHTML = '<p>여유로운 상태<p>';
    } else if (congetion >= 5) {
        outputElement.innerHTML = '<p>혼잡한 상태<p>';
    } else {
        outputElement.innerHTML = '<p>알 수 없는 상태<p>';
    }
}

function fetchbusData(vehID) {

    var xhr = new XMLHttpRequest();
    var url = 'http://ws.bus.go.kr/api/rest/buspos/getBusPosByVehId'; // 실제 API 엔드포인트
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + '서비스키 대입'; // 실제 서비스 키
    queryParams += '&' + encodeURIComponent('vehID') + '=' + encodeURIComponent(vehID);
    queryParams += '&' + encodeURIComponent('') 
    xhr.open('GET', url + queryParams);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        // response에서 JSON형태로 데이터 추출
        var bus_id = response.body[0].vehID;
        var busType = response.body[0].busType;
        var congetion = response.body[0].congetion;

       
  
        // HTML 요소에 데이터 삽입
        document.getElementById('bus_id').textContent = bus_id;
        document.getElementById('bus_info').textContent = busType;
        document.getElementById('bus_cong').textContent = congetion;


        handleType(busType);
        handleCongetion(congetion);

      }
    };
  
    xhr.send('');
}