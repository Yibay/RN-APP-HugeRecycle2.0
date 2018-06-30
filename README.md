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

<h4>可能发生的问题：</h4>
<p>导出ipa时，报错：ipatool failed with an exception: #&lt;CmdSpec::NonZeroExcitException: /Applica</p>
<p>原因：引入 react-native-image-crop-picker 导致</p>
<p>解法：导出包时，不勾选 Rebuild from Bitcode</p>