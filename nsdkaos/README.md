

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
    debugImplementation ('vn.mc.tdi_news:flutter_debug:1.0')
    profileImplementation ('vn.mc.tdi_news:flutter_profile:1.0')
    releaseImplementation ('vn.mc.tdi_news:flutter_release:1.0')
}
```


## Who use it
Init SDK
```kotlin
import vn.mc.tdinews.TdiNews
```

```kotlin
TdiNews.Builder(this)
    .initSDK { info ->
        print("init SDK completed")
    }
```

Development service url: https://api.dev.inappnews.net

Product service url: https://api.inappnews.net

Default parameters:

ServiceUrl: Development

APN: `TdiNews.APN.oneSignal`

If you want specify init configurations:

```kotlin
TdiNews.Builder(this)
    .setServiceUrl("https://api.dev.inappnews.net")
    .setAPN(TdiNews.APN.firebase)
    .initSDK { info ->
        print("init SDK completed")
    }
```

Launch news UI from your activity (made sure SDK was initialized):
```kotlin
val intent = TdiNews.getIntent(this)
startActivity(intent)
```
