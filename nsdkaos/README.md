[iOS](https://github.com/kaivumetacrew/Readme/tree/main/nsdkios) 

<div align="center">


# IN APP NEWS SDK
![logo_ko](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/nsdkaos/logo_ko.png)

</div>

Delivered SDK include:
- Sample android project (path: [SampleAndroid]())
- NewsSDK module (path: [SampleAndroid/tdinews]())

## Add News SDK to exist Android project
`File` -> `New` -> `Import module` -> select [tdinews module] `(folder "tdinews")`

## Add maven repo path for [NewsSDK module] in project settings
If project using gradle early than `7.0.2`

In [rootProject/build.gradle]()

```groovy

allprojects {
    repositories {
        maven { url 'tdinews/news' } //+
        maven { url "https://storage.googleapis.com/download.flutter.io" } //+
    }
}

```

If project using gradle `7.0.2` above

In [rootProject/settings.gradle]()

```groovy
dependencyResolutionManagement {
    String storageUrl = System.env.FLUTTER_STORAGE_BASE_URL ?: "https://storage.googleapis.com" //+
    repositories {
        maven { url 'sdk' }  //+
        maven { url "$storageUrl/download.flutter.io" }  //+
    }
}

```

## Add NewsSDK dependencies
in main application gradle
```groovy
implementation project(":tdinews"){
    implementation ('vn.mc.tdi_news:flutter_release:1.0')
}
```

Or implement with build type:
```groovy
implementation project(":tdinews"){
    debugImplementation 'vn.mc.tdi_news:flutter_debug:1.0'
    profileImplementation 'vn.mc.tdi_news:flutter_profile:1.0'
    releaseImplementation 'vn.mc.tdi_news:flutter_release:1.0'
}
```

## How to use it
Init SDK
```kotlin
import vn.mc.tdinews.TdiNews
```

Please replace `YOUR_CLIENT_ID` by your id which provided by MC developer
or using client id "IANCT-TEST" for development and testing
Should be put in your `Application.onCreate` or launch activity
```kotlin
TdiNews.Builder(this)
    .setClientId("IANCT-TEST")
    .initSDK { info ->
        print("init sdk completed")
    }
```

Test service url: https://api.uat.inappnews.net

Product service url: https://api.inappnews.net

Default parameters:

ServiceUrl: [Development](https://api.uat.inappnews.net)

APN: `TdiNews.APN.OneSignal`

If you want specify init configurations:
Please replace `YOUR_CLIENT_ID` by your id which provided by MC developer
```kotlin
TdiNews.Builder(this)
    .setClientId("{YOUR_CLIENT_ID}")
    .setServiceUrl("{SERVICE_URL}")
    .setAPN(TdiNews.APN.OneSignal)
    .initSDK { info ->
        print("init sdk completed")
    }
```

Launch news UI from your activity (made sure SDK was initialized):
```kotlin
if (TdiNews.hasInitialized) {
    startActivity(TdiNews.getIntent(this))
}
```

## Handle notification click
Sample handle notification click 
![embed_framework](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/nsdkaos/sample_flow.png)

Should be put inside onCreate of activity that it will native news content, and it is activity what news content back to
```kotlin
TdiNews.listenSDKInitialized {
    // Maybe you already have permission but you should add it like this
    TdiNews.requestPermission(object : TdiNews.OnPermissionResult {
        override fun onGranted() {
        }

        override fun onRejected() {
        }

        override fun onError(e: Throwable?) {
        }
    })
    try {
        // You need to put it inside the onCreate of the activity that will be the default
        // news content, and it is the Activity that returns the news content back to you.
        TdiNews.setActivityHandleNotification(this)
    } catch (e: Exception) {
        Toast.makeText(this, e.message, Toast.LENGTH_SHORT).show()
    }
}
```

Put your notification provided by client
-
Inside app/AndroidManifest.xml tag `application`

Test service:
```xml
  <meta-data
    android:name="com.onesignal.NotificationServiceExtension"
    android:value="vn.mc.tdinews.TdiNotificationServiceTest" />
```

ex: `vn.mc.tdinews.TdiNotificationServiceIANCT001`

## To replace notification icon
Put a drawable notification icon named "ic_stat_onesignal_default.xml" 
in resource path: `res/drawable/ic_stat_onesignal_default.xml`


