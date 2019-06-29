function initMap() {

    var myMap1, myMap1;

    var element1 = document.getElementById('google-map-1');
    var element2 = document.getElementById('google-map-2');

    var options1 = {
        zoom: 17,
        center: {lat:46.491634,lng:30.731912},
        scrollwheel: false
    };

    var options2 = {
        zoom: 17,
        center: {lat:53.925284,lng:27.570160},
        scrollwheel: false
    };

    // maps initialization
    var myMap1 = new google.maps.Map(element1, options1);
    var myMap2 = new google.maps.Map(element2, options2);

    // marker and info-window
    var marker1 = new google.maps.Marker({
        position: {lat:46.491634,lng:30.731912},
        map: myMap1
    });

    var marker2 = new google.maps.Marker({
        position: {lat:53.925284,lng:27.570160},
        map: myMap2
    });

    var InfoWindow1 = new google.maps.InfoWindow({
        content: '<div class="info-window"><strong>Магазин “Технолюкс”</strong><a href="tel:+380688199506">+38 (068) 819 95 06</a></div>'
    });

    var InfoWindow2 = new google.maps.InfoWindow({
        content: '<div class="info-window"><strong>Магазин “Технолюкс” (ERC)</strong><a href="tel:+380688199506">+38 (068) 819 95 06</a></div>'
    });

    marker1.addListener('click', function () {
        InfoWindow1.open(myMap1, marker1);
    });

    marker2.addListener('click', function () {
        InfoWindow2.open(myMap2, marker2);
    });

};