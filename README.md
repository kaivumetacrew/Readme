# Include news sdk

### In android root project dir: settings.gradle
```gradle
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
     // Add storageUrl 
    String storageUrl = System.env.FLUTTER_STORAGE_BASE_URL ?: "https://storage.googleapis.com"
    repositories {
        google()
        mavenCentral()
        // Add maven 
        maven {
            //tdi_news is folder whichput in root project dir
            url 'tdi_news'
        }
         // Add maven 
        maven {
            url "$storageUrl/download.flutter.io"
        }
    }
}
```

-------------

### In main application dir: build.gradle
```gradle
dependencies {
    // add dependencies
    debugImplementation 'vn.mc.tdi_news:flutter_debug:1.0'
    profileImplementation 'vn.mc.tdi_news:flutter_profile:1.0'
    releaseImplementation 'vn.mc.tdi_news:flutter_release:1.0'
}
```

### In main application dir: Manifest.xml

```gradle
<activity
        android:name="io.flutter.embedding.android.FlutterActivity"
        android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
        android:hardwareAccelerated="true"
        android:windowSoftInputMode="adjustResize" />

<meta-data
        android:name="com.google.android.gms.ads.APPLICATION_ID"
        android:value="ca-app-pub-5557517834430684~5840633665" />

```


### Start news sdk:

Init flutter engine
```kotlin
object FlutterEngineFactory {
    private var isInitialized: Boolean = false

    fun initEngine(context: Context) {
        if (isInitialized) return
        val flutterEngine = FlutterEngine(context)
        val dartEntry = DartExecutor.DartEntrypoint.createDefault()
        flutterEngine.dartExecutor.executeDartEntrypoint(dartEntry)
        FlutterEngineCache
            .getInstance()
            .put("flutter_engine", flutterEngine)
        isInitialized = true
    }
}
```

Start news sdk
```kotlin
    val intent = FlutterActivity.createDefaultIntent(this@MainActivity)
    startActivity(intent)
```