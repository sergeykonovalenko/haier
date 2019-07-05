function initMap() {

    let myMap1, myMap2;

    let element1 = document.getElementById('google-map-1');
    let element2 = document.getElementById('google-map-2');

    let options1 = {
        zoom: 17,
        center: {lat:46.4465519, lng:30.7086811},
        scrollwheel: false
    };

    let options2 = {
        zoom: 17,
        center: {lat:50.4964745, lng:30.4747789},
        scrollwheel: false
    };

    // maps initialization
    myMap1 = new google.maps.Map(element1, options1);
    myMap2 = new google.maps.Map(element2, options2);

    // marker and info-window
    let marker1 = new google.maps.Marker({
        position: {lat:46.4465519, lng:30.7086811},
        map: myMap1
    });

    let marker2 = new google.maps.Marker({
        position: {lat:50.4964745, lng:30.4747789},
        map: myMap2
    });

    let InfoWindow1 = new google.maps.InfoWindow({
        content: ''+
            '<div class="info-window">' +
            '   Малиновський рынок, Р57<br>' +
            '   Магазин “Технолюкс”<br>' +
            '   Телефон: <a href="tel:+380688199506">+38 (068) 819 95 06</a>' +
            '</div>'
    });

    let InfoWindow2 = new google.maps.InfoWindow({
        content: '' +
            '<div class="info-window">' +
            '   ул. Марко Вовчок 18А<br>' +
            '   Магазин “Технолюкс” (ERC)<br>' +
            '   Телефон: <a href="tel:+380688199506">+38 (068) 819 95 06</a>' +
            '</div>'
    });

    marker1.addListener('click', function () {
        InfoWindow1.open(myMap1, marker1);
    });

    marker2.addListener('click', function () {
        InfoWindow2.open(myMap2, marker2);
    });

}
