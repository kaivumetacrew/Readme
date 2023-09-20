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

`Application target settings` -> `Build Phases` -> `Link Binary With Libraries`
`Add Other...` -> `Add Files...` -> select
all [*.xcframework]() `(folder "SampleIOS/TdiNews/news/")`
Then embed them in `General` -> `Frameworks, Libraries, and Embedded Content`
![02](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/nsdkios/nsdkios2.png)

## Who use it

Init SDK

```swift
import TdiNews
```

```swift
TdiNews.Builder(UIApplication.shared)
    .initSDK{ info in
        print("init SDK completed")
    }
```

Default service url is development service "https://api.dev.inappnews.net"
Default notification service is OneSignal if you want specify init with other service:

```swift
TdiNews.Builder(UIApplication.shared)
    .setServiceUrl("https://api.dev.inappnews.net")
    .setAPN(TdiNews.APN.Firebase)
    .initSDK{ info in
         print("init SDK completed")
    }
```

Launch news UI from your UIViewController (made sure SDK was initialized):

```swift
self.present(TdiNews.shared.viewController(), animated: true, completion: nil)
```

## Receive news notifications

For notification in news sdk you need add Background Modes and Push Notifications Capability
in `Application target settings` -> `Signing & Capability` -> `+ Capability`
If exist application had Background Modes and Push Notifications capability, please skip this step
![03](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/nsdkios/nsdkios3.png)
