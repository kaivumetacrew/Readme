
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

// Lấy fcmToken để gửi back-end
function getFcmToken() {
    window.addEventListener("fcmToken", function(event) {
           //let deviceId = event.detail.deviceId;
           //let fcmToken = event.detail.fcmToken;
           const div = document.getElementById('fcm_token');
           div.textContent =JSON.stringify(event.detail, undefined, 2);
       });
    window.flutter_inappwebview.callHandler('fcmToken');
}

// Lấy data của notification mà user nhấn vào
function notificationData(data) {
    window.addEventListener("notificationData", function(event) {
         const div = document.getElementById('notification_data');
         div.textContent =JSON.stringify(event.detail, undefined, 2);
    });
    window.flutter_inappwebview.callHandler('notificationData');
}

// Đạt thông báo vào thời điểm nào đó
function scheduleNotify(data) {
    window.flutter_inappwebview.callHandler('scheduleNotify',{
         id: "uniqueId",
         title: "Sample notify",
         body : "Sample notify after 10 seconds",
         time : Date.now() + (10000)
    });
}

// Bật thông báo theo kênh,
function enableChannel(){
    window.flutter_inappwebview.callHandler('enableChannel',{
         channelId: "message",
    });
    window.flutter_inappwebview.callHandler('enableChannel',{
         channelId: "appointment",
    });
}

// Tắt thông báo theo kênh
function disableChannel(){
    window.flutter_inappwebview.callHandler('disableChannel',{
         channelId: "message",
    });
    window.flutter_inappwebview.callHandler('disableChannel',{
         channelId: "appointment",
    });
}

// Thông báo hiện tại đang có
function notificationCount(){
    window.addEventListener("notificationCount", function(event) {
        //let deviceId = event.detail.deviceId;
        //let fcmToken = event.detail.fcmToken;
       const div = document.getElementById('notification_count');
       div.textContent = "Notitication " +  event.detail.count;
    });
    window.flutter_inappwebview.callHandler('notificationCount');
}

// Lắng nghe có thông báo đến khi app đang mở
function onNotificationReceived() {
    window.addEventListener("onNotificationReceived", function(event) {
       const div = document.getElementById('notification_data');
       div.textContent =JSON.stringify(event.detail, undefined, 2);
       notificationCount();
    });
}

function openBrowser(){
    window.flutter_inappwebview.callHandler('actionView',{
        url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
   });
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



function locationEnableStatus(){
    window.addEventListener("locationEnableStatus", function(event) {
         const div = document.getElementById('location_enable');
         div.textContent = event.detail.enable;
    });
    window.flutter_inappwebview.callHandler('locationEnableStatus');
}

function locationEnableRequest(){
    window.addEventListener("locationEnableRequest", function(event) {
        console.log(event.detail.enable);
    });
    window.flutter_inappwebview.callHandler('locationEnableRequest');
}


function locationStatus(){
    //granted: the permission to use location services has been granted for high accuracy.

    //grantedLimited: The permission has been granted but for low accuracy.
    //Only valid on iOS 14+.

    //denied: the permission to use location services has been denied by the user. May
    //have been denied forever on iOS.

    //deniedForever: the permission to use location services has been denied forever by the
    //user. No dialog will be displayed on permission request.

   window.addEventListener("locationStatus", function(event) {
        const div = document.getElementById('location_permission');
        div.textContent = event.detail.permissionStatus;
   });
   window.flutter_inappwebview.callHandler('locationStatus');
}

function locationRequest(){
    window.addEventListener("locationRequest", function(event) {
         console.log(event.detail.permissionStatus);
    });
    window.flutter_inappwebview.callHandler('locationRequest');
}

function notificationStatus(){
   window.addEventListener("notificationStatus", function(event) {

   });
   window.flutter_inappwebview.callHandler('notificationStatus');
}

function notificationRequest(){
    window.addEventListener("notificationRequest", function(event) {
         console.log(event.detail.permissionStatus);
    });
    window.flutter_inappwebview.callHandler('notificationRequest');
}


function startGeoShare(){
    window.flutter_inappwebview.callHandler('startGeoShare',{
        user: {
            id: "user1",
            name: "슬픈 짜장면",
            avatar: null,
        },
        appointmentId: "appointmentId"
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

function pickImage(){
    window.addEventListener("pickImage", function(event) {
        const img = document.getElementById('image1');
        img.src = "data:image/jpg;base64," + event.detail.base64Image;
        //or
        //img.src = event.detail.path;
    });
    window.flutter_inappwebview.callHandler('pickImage');
}

function pickImageFromCamera(){
    window.addEventListener("pickImageFromCamera", function(event) {
        const img = document.getElementById('image2');
        img.src = "data:image/jpg;base64," + event.detail.base64Image;
        //or
        //img.src = event.detail.path;
    });
    window.flutter_inappwebview.callHandler('pickImageFromCamera');
}

function pickImages(){
    window.addEventListener("pickImages", function(event) {
            // event.detail = {
            //    "2335435435": {
            //        "base64Image" : "DTFKJHB32534%RTYF534534534HG..."
            //        "path": "/.."
            //    },
            //    "2335435436": {
            //         "base64Image" : "JKYBGFKNGUNGFBJTDVHRTSFDYJFUKFG..."
            //         "path": "/.."
            //    }
            //}
    });
    window.flutter_inappwebview.callHandler('pickImages', { max: 5 });
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

function pickFile(){
    window.addEventListener("pickFile", function(event) {
        console.log("pickFile");
        const div = document.getElementById('file_info');
        console.log(JSON.stringify(event.detail, undefined, 2));
        div.textContent = JSON.stringify(event.detail, undefined, 2);
    });
    window.flutter_inappwebview.callHandler('pickFile');
}

function pickFiles(){
    window.addEventListener("pickFiles", function(event) {
        console.log("pickFiles");
        const div = document.getElementById('files_info');
        console.log(JSON.stringify(event.detail, undefined, 2));
        div.textContent = JSON.stringify(event.detail, undefined, 2);
    });
    window.flutter_inappwebview.callHandler('pickFiles');
}