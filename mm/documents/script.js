
function sendDataToNative(...args) {
    // In native receive data by handle name
    // ex: webViewController.addJavaScriptHandler(
    //            handlerName: "handleData",
    //            callback: (arguments) async {
    //                  print(arguments)
    //            }
    //     );
    return window.flutter_inappwebview
                    .callHandler(
                        'handleData',
                         1,
                         true,
                         ['bar', 5],
                         {foo: 'baz'}
                    );
}

function receiveDataFromNative(data) {
    // In native use by call function name
    // ex: receiveDataFromNative(..)
    const div = document.getElementById('native_message');
    div.textContent = JSON.stringify(data);
}

function getDeviceInfo(){
   window.addEventListener("deviceInfo", function(event) {
        const div = document.getElementById('device_info');
        div.textContent = JSON.stringify(event.detail, null, 4);
   });
   window.flutter_inappwebview.callHandler('deviceInfo');
}

function getLocationPermissionStatus(){
    //granted: the permission to use location services has been granted for high accuracy.

    //grantedLimited: The permission has been granted but for low accuracy.
    //Only valid on iOS 14+.

    //denied: the permission to use location services has been denied by the user. May
    //have been denied forever on iOS.

    //deniedForever: the permission to use location services has been denied forever by the
    //user. No dialog will be displayed on permission request.

   window.addEventListener("locationPermission", function(event) {
        const div = document.getElementById('location_permission');
        div.textContent = event.detail.permissionStatus;
   });
   window.flutter_inappwebview.callHandler('locationPermission');
}

function getLocationEnableStatus(){
    window.addEventListener("locationEnable", function(event) {
         const div = document.getElementById('location_enable');
         div.textContent = event.detail.enable;
    });
    window.flutter_inappwebview.callHandler('locationEnable');
}

function requestLocationPermission(){
    window.addEventListener("requestLocationPermission", function(event) {
         console.log(event.detail.permissionStatus);
    });
    window.flutter_inappwebview.callHandler('requestLocationPermission');
}

function requestLocationService(){
    window.addEventListener("requestLocationService", function(event) {
          console.log(event.detail.enable);
    });
    window.flutter_inappwebview.callHandler('requestLocationService');
}

function trackingLocation(){
    window.addEventListener("trackingLocation", function(event) {
        const div = document.getElementById('current_location');
        div.textContent = JSON.stringify(event.detail);
    });
    window.flutter_inappwebview.callHandler('trackingLocation');
}
