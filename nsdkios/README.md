[Android](https://github.com/kaivumetacrew/Readme/tree/main/nsdkaos)

<div align="center">


# IN APP NEWS SDK
![logo_ko](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/nsdkaos/logo_ko.png)

</div>

Delivered SDK include:

- Sample xcode project (path: [SampleIOS]())
- NewsSDK Swift package (path: [SampleIOS/TdiNews]())

## Add News SDK to exist XCode project

In exist Xcode project
`Application target settings` -> `General` -> `Frameworks, Libraries, and Embedded Content`

`Add Other...` -> `Add Files...` -> select [TdiNews package]() `(folder "SampleIOS/TdiNews")`

![01](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/nsdkios/nsdkios1.png)

Example project, you can drag the frameworks from sample/SampleIOS/TdiNews/news/Debug/ in Finder into your target’s Build Settings > Build Phases > Link Binary With Libraries.

In the target’s build settings, add `$(PROJECT_DIR)/TdiNews/news/Release/` to the Framework Search 
Paths (FRAMEWORK_SEARCH_PATHS).

![02](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/nsdkios/nsdkios2.png)

`Application target settings` -> `Build Phases` -> `Link Binary With Libraries`
Please remove all of .xcframework if that you added before. Because after you add `TdiNews` these frameworks was automatically linked to project with this update. 
Or Not ever do that before, please skip this step
![03](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/nsdkios/nsdkios3.png)

## How to use
Init SDK

```swift
import TdiNews
```

Please replace `YOUR_CLIENT_ID` by your id which provided by MC developer
or using client id "IANCT-TEST" for development and testing
```swift
TdiNews.Builder(UIApplication.shared)
    .setClientId("IANCT-TEST")
    .initSDK { info in
        self.showInfoText(info)
    }
```
```objectivec
[[TdiNews shared] requestPermission];
[[[Builder alloc] setClientId:@"IANCT-TEST"]
initSDK:^(Info * info) {
    [[self labelInfo] setText: [info toString]];
}];
```

Test service url: https://api.uat.inappnews.net

Product service url: https://api.inappnews.net

Default parameters:

ServiceUrl: [Development](https://api.uat.inappnews.net)

APN: `TdiNews.APN.OneSignal`

If you want specify init configurations:
Please replace `YOUR_CLIENT_ID` by your id which provided by MC developer
```swift
TdiNews.Builder(UIApplication.shared)
    .setClientId("{YOUR_CLIENT_ID}")
    .setServiceUrl("{SERVICE_URL}")
    .initSDK { info in
        self.showInfoText(info)
    }
```
```objectivec
[[TdiNews shared] requestPermission];
[[[Builder alloc] setClientId:@"{YOUR_CLIENT_ID}"]
initSDK:^(Info * info) {
    [[self labelInfo] setText: [info toString]];
}];
```

Launch news UI from your UIViewController (made sure SDK was initialized):

```swift
self.present(TdiNews.shared.viewController(), animated: true, completion: nil)
```
```objectivec
UIViewController * vc = [[TdiNews shared] viewController];
[self presentViewController:vc animated:true completion:nil];
```

## Receive news notifications
If exist application had Background Modes and Push Notifications capability, please skip this step

For notification in news sdk you need add Background Modes and Push Notifications Capability
in `Application target settings` -> `Signing & Capability` -> `+ Capability`
![04](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/nsdkios/nsdkios4.png)

In `AppDelegate` implement `UNUserNotificationCenterDelegate` 
```swift
class AppDelegate: UIResponder, UIApplicationDelegate, UNUserNotificationCenterDelegate
```
```objectivec

```

