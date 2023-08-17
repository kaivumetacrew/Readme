
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

// Native would call this function directly as:
// receiveDataFromNative({message: 'Hello web'});
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

function startLocationTracking(){
    window.addEventListener("locationTracking", function(event) {
        const div = document.getElementById('current_location');
        div.textContent = JSON.stringify(event.detail);
    });
    window.flutter_inappwebview.callHandler('locationTracking');
}

function pickImage(){
    window.addEventListener("pickImage", function(event) {
        const img = document.getElementById('image');
        img.src = "data:image/jpg;base64," + event.detail.base64Image;
        //or
        //img.src = event.detail.path;
    });
    window.flutter_inappwebview.callHandler('pickImage');
}

function geoShareScreen(){
    window.flutter_inappwebview.callHandler('geoShareScreen',{
        "conversationId" : "123"
    });
}

function listenSignInResult(){
    window.addEventListener("signIn", function(event) {
        const div = document.getElementById('sign_in_result');
        div.textContent = JSON.stringify(event.detail);
    });
}

function getCurrentUser(){
    window.addEventListener("getCurrentUser", function(event) {
        const div = document.getElementById('sign_in_result');
        div.textContent = JSON.stringify(event.detail);
    });
    window.flutter_inappwebview.callHandler('getCurrentUser' );
}

function appleSignIn(){
    window.flutter_inappwebview.callHandler('signIn',
        { provider: 'apple' }
    );
}

function kakaoSignIn(){
    window.flutter_inappwebview.callHandler('signIn',
        { provider: 'kakao' }
    );
}

function googleSignIn(){
    window.flutter_inappwebview.callHandler('signIn',
        { provider: 'google' }
    );
}

function naverSignIn(){
    window.flutter_inappwebview.callHandler('signIn',
        { provider: 'naver' }
    );
}

function signOut(){
    window.addEventListener("signOut", function(event) {
        const div = document.getElementById('sign_in_result');
        div.textContent = JSON.stringify(event.detail);
    });
    window.flutter_inappwebview.callHandler('signOut');
}

