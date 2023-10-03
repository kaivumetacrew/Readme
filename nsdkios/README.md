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
`Add Other...` -> `Add Files...` -> select
all [*.xcframework]() `(folder "SampleIOS/TdiNews/news/")`
Then embed them in `General` -> `Frameworks, Libraries, and Embedded Content`

![03](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/nsdkios/nsdkios3.png)

## Who use it

Init SDK

```swift
import TdiNews
```

Please replace `YOUR_CLIENT_ID` by your id which provided by MC developer
or using client id "IANCT-TEST" for development and testing
```swift
TdiNews.Builder(UIApplication.shared)
    .setClientId("{YOUR_CLIENT_ID}")
    .setServiceUrl("https://api.dev.inappnews.net")
    .initSDK { info in
        self.showInfoText(info)
    }
```

Development service url: https://api.dev.inappnews.net

Product service url: https://api.inappnews.net

Default parameters:

ServiceUrl: [Development](https://api.dev.inappnews.net)

APN: `TdiNews.APN.OneSignal`

If you want specify init configurations:
Please replace `YOUR_CLIENT_ID` by your id which provided by MC developer
```swift
TdiNews.Builder(UIApplication.shared)
    .setClientId("{YOUR_CLIENT_ID}")
    .setServiceUrl("https://api.dev.inappnews.net")
    .setAPN(TdiNews.APN.Firebase)
    .initSDK { info in
        self.showInfoText(info)
    }
```

Launch news UI from your UIViewController (made sure SDK was initialized):

```swift
self.present(TdiNews.shared.viewController(), animated: true, completion: nil)
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

## Custom Channel/Media receive notifications settings (After user update channel/media, device will receive notifications from all channel/media which it was selected)
Ios sample

<img src="https://raw.githubusercontent.com/kaivumetacrew/Readme/main/nsdkios/is1.png" width="200" height="auto">

<img src="https://raw.githubusercontent.com/kaivumetacrew/Readme/main/nsdkios/is3.png" width="200" height="auto">


To get current notification settings of selected channels
```swift
// Channel list for display to uicollectionview
var channels : [TdiNews.Channel] = []
```

```swift
TdiNews.shared.getCurrentChannels { channels in
    self.channels = channels
    channels.forEach { channel in
        // Would receive notification of this channel if isReceive value is true
        print("Channel: \(channel.name) Receive notification: \(channel.isReceive)")
    }
}
```

To update current notification settings of selected channels
```swift
// should show progress here
TdiNews.shared.updateCurrentChannels(channels: self.channels, channelsResult: { channels in
    // and should hide progress here
    self.dismiss(animated: true)
});
```