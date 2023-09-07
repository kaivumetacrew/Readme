[Android](https://github.com/kaivumetacrew/Readme/blob/main/README_android.md) | [iOS](https://github.com/kaivumetacrew/Readme/blob/main/README_ios.md)
# Integrate a Flutter module into your iOS project

### Link on the frameworks
For example, you can drag the frameworks from [some/path/SampleIOS/TdiNews/Release/]

![newssdk_ios_01](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/assets/newssdk_ios_01.png)
#
In Finder into your target’s Build  [Settings] > [Build Phases] > [Link Binary With Libraries]. 
In the target’s build settings, add [$(PROJECT_DIR)/TdiNews/Release]
to the [Framework Search Paths(FRAMEWORK_SEARCH_PATHS)].
![newssdk_ios_02](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/assets/newssdk_ios_02.png)

### Embed the frameworks
The generated dynamic frameworks must be embedded into your app to be loaded at runtime.
After linking the frameworks, you should see them in the [Frameworks, Libraries, and Embedded Content] section of your target’s General settings. To embed the dynamic frameworks select Embed & Sign.
They will then appear under Embed Frameworks within Build Phases as follows:
![newssdk_ios_03](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/assets/newssdk_ios_03.png)

![newssdk_ios_04](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/assets/newssdk_ios_04.png)

In [General] select all TdiNews framework and select embed

### Launch news sdk from parent app:

Create class:
```swift
import UIKit
import Flutter
import FlutterPluginRegistrant

class TdiNews{
    
    static var flutterEngine : FlutterEngine?
    
    static func onInitApp(launchOptions: [UIApplication.LaunchOptionsKey: Any]?){
        flutterEngine = FlutterEngine(name: "news sdk")
        flutterEngine?.run();
        GeneratedPluginRegistrant.register(with: self.flutterEngine!);
    }
    
    static func viewController() -> UIViewController {
        let vc = FlutterViewController(engine: flutterEngine!, nibName: nil, bundle: nil)
        vc.modalPresentationStyle = .fullScreen
        return vc
    }
    
}

```

Start a FlutterEngine and FlutterViewController
`TdiNews.onInitApp(launchOptions: launchOptions)`

In AppDelegate
```swift
@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
  
        TdiNews.onInitApp(launchOptions: launchOptions)
        
        return true
    }
}
```

Launch news sdk from ViewController
`self.present(TdiNews.viewController(), animated: true, completion: nil)`
```swift

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
    }

    @IBAction func onNewsTap(_ sender: Any) {
        self.present(TdiNews.viewController(), animated: true, completion: nil)
    }
    
}

```


Screenshot
![newssdk_ios_04](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/assets/newssdk_ios_05.png)