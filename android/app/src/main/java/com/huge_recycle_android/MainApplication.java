package com.huge_recycle_android;

import android.app.Application;

import com.huge_recycle_android.android_maputil.UtilMapPackage;
import com.huge_recycle_android.android_open_settings.OpenSettingsPackage;
import com.huge_recycle_android.android_umeng_analytics.DplusReactPackage;
import com.huge_recycle_android.android_umeng_analytics.RNUMConfigure;
import com.huge_recycle_android.android_upgrade.UpgradePackage;
import com.facebook.react.ReactApplication;
import com.ichong.zzy.mipush.MIPushPackage;
import cn.reactnative.alipay.AlipayPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.umeng.commonsdk.UMConfigure;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
              new MainReactPackage(),
              new MIPushPackage(),
              new AlipayPackage(),
              new OrientationPackage(),
              new VectorIconsPackage(),
              new UpgradePackage(),
              new OpenSettingsPackage(),
              new UtilMapPackage(),
              new DplusReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    RNUMConfigure.init(this, "5b1f747f8f4a9d068200000d", "Umeng", UMConfigure.DEVICE_TYPE_PHONE,
            null);
  }
}
