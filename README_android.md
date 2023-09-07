[Android](https://github.com/kaivumetacrew/Readme/blob/main/README_android.md) | [iOS](https://github.com/kaivumetacrew/Readme/blob/main/README_ios.md)

# Integrate a Flutter module into your android project

### In root/settings.gradle

```groovy
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
    String storageUrl = System.env.FLUTTER_STORAGE_BASE_URL ?: "https://storage.googleapis.com"  //+
    repositories {
        google()
        mavenCentral()
        maven { url 'sdk' }  //+
        maven { url "$storageUrl/download.flutter.io" }  //+
    }
}

```

### in main application gradle (app/build.gradle)

```groovy

dependencies {
    debugApi('vn.mc.tdi_news:flutter_debug:1.0')       //+
    profileApi('vn.mc.tdi_news:flutter_profile:1.0')   //+
    releaseApi('vn.mc.tdi_news:flutter_release:1.0')   //+
}
```

### to launch news

init engine
```kotlin
val flutterEngine = FlutterEngine(this)
val dartEntry = DartEntrypoint.createDefault()
flutterEngine.dartExecutor.executeDartEntrypoint(dartEntry)
FlutterEngineCache
    .getInstance()
    .put("flutter_engine", flutterEngine)

```

launch sdk
```kotlin
 val intent = FlutterActivity.NewEngineIntentBuilder(FlutterActivity::class.java)
                .build(this)
```