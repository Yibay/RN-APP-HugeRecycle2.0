# 虎哥回收2.0版本App（ReactNative版）
<h4>开发环境：</h4>
<ul>
    <li>macOS High Sierra 10.13.4 (17E202)</li>
    <li>AndroidStudio 3.0.1</li>
    <li>Xcode 9.3.1(9E501)</li>
    <li>node v8.0.0</li>
    <li>python v2.7.14</li>
    <li>Ruby 2.3.3p222</li>
    <li>NDK 17.1.4828580</li>
</ul>

<h4>环境变量：</h4>
<ul>
    <li>配置全局变量 ANDROID_NDK_HOME = [ndk所在目录]</li>
</ul>

<h4>热更新 注意事项：</h4>
<ul>
    <li>更新大版本时，热更新网站包，必须和应用商店包一致；内容不同，则热更新失效。</li>
    <li>更新大版本时，先上传热更新网站，再上传应用商店发布</li>
    <li>采用热更新的小版本，每一个热更新小版本，不要删。更换新的大版本后，上一版东西才可以删</li>
</ul>

<h4>react-native-xmpush 源码Bug fixed</h4>
<ul>
    <li>ios
        <ul>
            <li>异常：应用在前台时，收不到推送</li>
            <li>原因：源码中，前台 收到消息后，未触发通知栏显示</li>
            <li>解法：Libraries > RCTMIPushModule.xcodeproj > RCTMIPushModule > RCTMIPushModule.m 中 // 应用在前台收到通知的104行，添加 completionHandler(UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionSound);</li>
        </ul>
    </li>
    <li>
        android
        <ul>
            <li>异常：登出帐号，仍能收到推送消息</li>
            <li>原因：源码中，注销Account的方法，引错了SDK中的方法，实际未注销</li>
            <li>解法：android > src > main > java > com > ichong > zzy > mipush > MIPushModule.java中 @ReactMethod public void unsetAccount 内，改为 MiPushClient.unsetUserAccount  </li>
        </ul>
    </li>
</ul>

<br/>