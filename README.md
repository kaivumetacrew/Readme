# Setup workspace

### Build the Unity project

1.Build unity project and choose destination folder.
![](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/assets/01.png)
> Ex: it's name is "app" and put in folder which include xcode project folder.

-------------
2.cd to unity build destination "app".
![](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/assets/02.png)
 In terminal: run pod install --repo-update
```gem
cd app
pod install --repo-update
```

![](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/assets/03.png)
> If pod command is executed by unity build tool please skip this step

-------------

### Setup build settings
Open project by `Unity-iPhone.xcworkspace`
![](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/assets/04.png)

Add xcode project to workspace.
![](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/assets/05.png)

Select Unity-iPhone -> Build Settings -> Set `Enable Bitcode`  = No
![](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/assets/06.png)

Select target xcode -> General -> Add Frameworks, Libraries, and Embedded Content -> Add  `Unity-iPhone/UnityFramework.framework`
![](https://raw.githubusercontent.com/kaivumetacrew/Readme/main/assets/07.png)


**Select xcode project and run*
