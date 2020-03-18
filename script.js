(function(){

    var pointerDeviceRadio = window.document.getElementById('pointer-device');
    var touchDeviceRadio = window.document.getElementById('touch-device');
    var inputTarget = window.document.getElementById('input-target');
    var raportTarget = window.document.getElementById('raport-text');

    var deviceType = new Rx.BehaviorSubject(null);
    var report = new Rx.Subject();

    pointerDeviceRadio.addEventListener('change', function(e) {
        changeDevice();
    });

    touchDeviceRadio.addEventListener('change', function(e) {
        changeDevice();
    });

    function changeDevice() {
        var form_elements = document.getElementById('device-form').elements;
        var selectedType = form_elements['input-type'].value;

        console.log(selectedType);

        deviceType.next(selectedType);
    }

    function add(t) {
        report.next(t + '\n');
    }

    function initRaport() {
        add('UserAgent: ' + window.navigator.userAgent);
        add('');
        bowserRaport();
        touchRaport();

        add('');
        add('USER LOG:');
        add('');
    }

    deviceType.subscribe(function(value) {
        add('');
        add('=========== Device set to: ' + value + ' ==============');
        add('');

        switch (value) {
            case 'pointer':
                inputTarget.innerHTML = 'Click me...'
                break;

            case 'touch':
                inputTarget.innerHTML = 'Touch me...'
                break;

            default:
                inputTarget.innerHTML = 'Select device type (UP!)'

        }
    });

    report.subscribe(function(value) {
        raportTarget.value = raportTarget.value + value;
    });

    function bowserRaport() {
        add('----- bowser -----');

        flags = [
            'name',
            'version',
            'webkit',
            'blink',
            'gecko',
            'msie',
            'msedge',
            'mobile',
            'tablet',
            'chrome',
            'chromium',
            'firefox',
            'msie',
            'msedge',
            'safari',
            'android',
            'ios',
            'opera',
            'samsungBrowser',
            'phantom',
            'blackberry',
            'webos',
            'silk',
            'bada',
            'tizen',
            'seamonkey',
            'sailfish',
            'ucbrowser',
            'qupzilla',
            'vivaldi',
            'sleipnir',
            'kMeleon',
            'mac',
            'windows',
            'windowsphone',
            'linux',
            'chromeos',
            'android',
            'ios',
            'blackberry',
            'firefoxos',
            'webos',
            'bada',
            'tizen',
            'sailfish'
        ]

        for(var i = 0; i < flags.length; i++) {
            add('bowser.' + flags[i] + ' - ' + (bowser[flags[i]] || !!bowser[flags[i]] ));
        }

        add('');
    }

    function touchRaport() {
        add('----- Touch TEST -----');
        add("'ontouchstart' in window - " + ('ontouchstart' in window));
        add("navigator.maxTouchPoints - " + navigator.maxTouchPoints);
    }

    events = [
        'click',
        'dblclick',
        'mouseup',
        'mousedown',
        'touchstart',
        'touchmove',
        'touchend',
        'touchenter',
        'touchleave	',
        'touchcancel',
    ]

    for (var j = 0; j < events.length; j++) {
        (function(){
            var e = events[j];
            inputTarget.addEventListener(e, function(){
                add('Event: ' + e);
            })
        }())
    }





    initRaport();

}());
