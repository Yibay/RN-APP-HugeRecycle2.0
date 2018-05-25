package com.huge_recycle_android;

import com.facebook.react.ReactActivity;

import android.content.Intent; // <--- import react-native-orientation 禁止横屏
import android.content.res.Configuration; // <--- import react-native-orientation 禁止横屏

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "HugeRecycle2_0";
    }

    @Override
      public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK|Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED);
        this.sendBroadcast(intent);
    }
}
