
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
    div.textContent = JSON.stringify(data, undefined, 2);
}

function getDeviceInfo(){
    window.addEventListener("deviceInfo", function(event) {
        const div = document.getElementById('device_info');
        div.textContent = JSON.stringify(event.detail, undefined, 2);
    });
    window.flutter_inappwebview.callHandler('deviceInfo');
}

function saveData(){
    window.flutter_inappwebview.callHandler('saveData', "key1", "value",);
}

function clearData(){
    window.flutter_inappwebview.callHandler('saveData', "key1", null);
}

function getData(){
    window.addEventListener("getData", function(event) {
        const div = document.getElementById('current_data');
        div.textContent =JSON.stringify(event.detail.user, undefined, 2);
    });
    window.flutter_inappwebview.callHandler('getData',"user");
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

function startGeoShare(){
    window.flutter_inappwebview.callHandler('startGeoShare',{
        user: {
            id: "user1",
            name: "슬픈 짜장면",
            avatar: null,
        }
    });
}

function stopGeoShare(){
    window.flutter_inappwebview.callHandler('stopGeoShare');
}

function geoSearch(){
    window.addEventListener("geoSearch", function(event) {
        const div = document.getElementById('geo_search');
        // event.detail.totalCount
        // event.detail.count
        // event.detail.page
        // event.detail.places
        div.textContent = JSON.stringify(event.detail, undefined, 2);
    });
    window.flutter_inappwebview.callHandler('geoSearch', {
        keyword: "gs25",
        page: 1,
        count : 100
    });
}

function turnOnNotification(){
    window.flutter_inappwebview.callHandler('turnOnNotification');
}

function currentGeo(){
    window.addEventListener("currentGeo", function(event) {
        const div = document.getElementById('geo_search');
        div.textContent = JSON.stringify(event.detail, undefined, 2);
    });
    window.flutter_inappwebview.callHandler('currentGeo', {
        isSimulate: true,
        timeout: 5
    });
}

function scheduleNotify(){
    window.flutter_inappwebview.callHandler('scheduleNotify',{
        id: "uniqueId",
        title: "Sample notify",
        body : "Sample notify after 10 seconds",
        time : Date.now() + (10000) // millisecondsSinceEpoch, null if notify at moment
    });
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
        appointment: {
            id: "appointmentId1",
            name: "Đá banh tay vịn",
            host: "user2",
            latitude: 37.56234999333856,
            longitude: 126.97751077099053,
            address: "669 Dien Bien Phu, Binh Thanh",
            addressName: "HB Tower",
            time: "2023-09-10 15:30:00 string or number",
            users: [
                {
                    id: "user1",
                    name: "슬픈 짜장면",
                    avatar: "https://pbs.twimg.com/profile_images/1372304699601285121/5yBS6_3F_400x400.jpg"
                },
                {
                    id: "user2",
                    name: "부지런한 코끼리"
                },
                {
                    id: "user3",
                    name: "부끄러운 플라밍고"
                },
                {
                    id: "user4",
                    name: "행복한 두리안"
                },
                {
                    id: "user5",
                    name: "진취적인 코알라"
                }
            ]
        },
        user: {
            id: "user1",
            name: "슬픈 짜장면",
            avatar: null
        }
    });
}

function listenSignInResult(){
    window.addEventListener("signIn", function(event) {
        const div = document.getElementById('sign_in_result');
        div.textContent = JSON.stringify(event.detail, undefined, 2);
    });
}

function getCurrentUser(){
    window.addEventListener("getCurrentUser", function(event) {
        const div = document.getElementById('sign_in_result');
        div.textContent = JSON.stringify(event.detail, undefined, 2);
    });
    window.flutter_inappwebview.callHandler('getCurrentUser' );
}

function appleSignIn(){
    window.flutter_inappwebview.callHandler('signIn',
        { provider: 'apple' }
    );
}

function share(){
    window.flutter_inappwebview.callHandler('share',
        { url: 'https://goo.gl/maps/U5KQEhL1TDQDihnYA' }
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

function passwordSignIn(){
    window.flutter_inappwebview.callHandler('signIn',
        {
            provider: 'password',
            email: 'metacrewvndev@gmail.com',
            password : 'Devmetacrew123!@#'
        }
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
        div.textContent = JSON.stringify(event.detail, undefined, 2);
    });
    window.flutter_inappwebview.callHandler('signOut');
}

