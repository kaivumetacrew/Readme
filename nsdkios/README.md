[Android](https://github.com/kaivumetacrew/Readme/tree/main/nsdkaos)

<div align="center">


# IN APP NEWS SDK
![logo_ko](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/nsdkaos/logo_ko.png)

</div>

Delivered SDK include:

- Sample xcode project include both Swift and Objective C version (path: [SampleIOS]())
- NewsSDK package (path: [SampleIOS/TdiNews]())

## Add News SDK to exist XCode Project

1. Copy the SDK folder to your Project folder, then drag it into the Project Navigator.
   
   ![01](https://raw.githubusercontent.com/kaivumetacrew/Readme/huge/nsdkios/nsdk1.png)
   
2. Link the SDK package into the `Frameworks, Libraries, and Embedded Content` section.

   ![01](https://raw.githubusercontent.com/kaivumetacrew/Readme/huge/nsdkios/nsdk2.png)


### Objective C Project

If your Project is base on Objective C, then create `Bridging-Header.h` file and import SDK into it.

   ![01](https://raw.githubusercontent.com/kaivumetacrew/Readme/huge/nsdkios/nsdk3.png)

You can create a bridging file automatically or manually. Incase of manually, make sure its path in `Build Setting` is correct. 

   ![01](https://raw.githubusercontent.com/kaivumetacrew/Readme/huge/nsdkios/nsdk4.png)

## Switch package mode

We have 3 modes of SDK to use in app: Debug, Release and Profile.

1. In the Package file, select your desired mode by selecting the corresponding folder (comment the unused others). Below is the debug mode.
   
   ![01](https://raw.githubusercontent.com/kaivumetacrew/Readme/huge/nsdkios/nsdk5.png)

3. `Build` app, the package now is updated.

4. Update the current package to the latest version: `Menu` -> `File` -> `Packages` -> `Update to Latest Package Versions`.

Now the app is using the new mode.
   


## Usage

### Swift

Init SDK

```swift
import TdiNews
```

Please replace `YOUR_CLIENT_ID` by your id which provided by MC developer
or using client id "IANCT-TEST" for development and testing
```swift
TdiNews.Builder()
    .setClientId("IANCT-TEST")
    .setServiceUrl("https://api.uat.inappnews.net")
    .initSDK { info in
        self.showInfoText(info)
    }
```

Test service url: https://api.uat.inappnews.net

Product service url: https://api.inappnews.net

Default parameters:

ServiceUrl: [Development](https://api.uat.inappnews.net)

APN: `TdiNews.APN.OneSignal`

If you want specify init configurations:
Please replace `YOUR_CLIENT_ID` by your id which provided by MC developer
```swift
TdiNews.Builder()
    .setClientId("{YOUR_CLIENT_ID}")
    .setServiceUrl("{SERVICE_URL}")
    .setAPN(TdiNews.APN.OneSignal)
    .initSDK { info in
      //your service info here 
    }
```

Launch news UI from your UIViewController (made sure SDK was initialized):

```swift
self.present(TdiNews.shared.viewController(), animated: true, completion: nil)
```

### Objective C

All behaviors are the same as Swift but the language now is Objective C.

Import Bridge-Header.h where you want to call the sdk

```objective c
#import "Bridge-Header.h" 
```
Init SDK
```objective c
    [[[[Builder alloc] setClientId:@"{YOUR_CLIENT_ID}"] setServiceUrl:@"{SERVICE_URL}"] initSDK:^(Info * info) {
        //your service info here 
    }];
```
Present news UI
```objective c
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

