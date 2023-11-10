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

![embed_framework](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/nsdkios/embed_framework.png)

`Application target settings` -> `Build Phases` -> `Link Binary With Libraries`
Please remove all of .xcframework if that you added before. Because after you add `TdiNews` these
frameworks was automatically linked to project with this update.

If you ever don't this before, please skip this step.

![remove_framework](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/nsdkios/remove_framework.png)


## Create Objective-C Bridging Header file:
If your project is exist .h Objective-C Bridging Header file, please skip this step
Create a .h file, in `Application target settings` -> `Build Settings` -> `Swift Compiler` -> Declare your .h header
```objectivec
#import <UIKit/UIKit.h>
#import "SampleIOS-Bridging-Header.h"

@interface ViewController : UIViewController

@end
```

## How to use

Init SDK
In ViewController, import your `{YOUR_BRIDGING_HEADER_FILE.h}`
```objectivec
#import "SampleIOS-Bridging-Header.h"

@interface ViewController ()

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
}
@end
```

Please replace `YOUR_CLIENT_ID` by your id which provided by MC developer
or using client id "IANCT-TEST" for development and testing
```objectivec
- (void)viewDidLoad {
    [super viewDidLoad];
    [[TdiNews shared] requestPermission];
    [[[Builder alloc] setClientId:@"IANCT-TEST"]
     initSDK:^(Info * info) {
        [[self labelInfo] setText: [info toString]];
    }];
}
```

Default parameters:
ClientId: "IANCT-TEST"
ServiceUrl: [Development](https://api.inappnews.net)
APN: `TdiNews.APN.OneSignal`

If you want specify init configurations:
Please replace `YOUR_CLIENT_ID` by your id which provided by MC developer
```objectivec
[[TdiNews shared] requestPermission];
[[[Builder alloc] setClientId:@"{YOUR_CLIENT_ID}"]
initSDK:^(Info * info) {
    [[self labelInfo] setText: [info toString]];
}];
```

Launch news UI from your UIViewController (made sure SDK was initialized):
```objectivec
- (IBAction)onNavigateNews:(id)sender {
    UIViewController * vc = [[TdiNews shared] viewController];
    [self presentViewController:vc animated:true completion:nil];
}
```

## Receive news notifications
If exist application had Background Modes and Push Notifications capability, please skip this step

For notification in news sdk you need add Push Notifications Capability
in `Application target settings` -> `Signing & Capability` -> `+ Capability`
![04](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/nsdkios/background_modes.png)

In `AppDelegate` implement `UNUserNotificationCenterDelegate` 
```objectivec
#import <UserNotifications/UserNotifications.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate,UNUserNotificationCenterDelegate>
```

