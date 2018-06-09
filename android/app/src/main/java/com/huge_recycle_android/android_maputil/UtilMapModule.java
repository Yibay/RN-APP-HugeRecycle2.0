package com.huge_recycle_android.android_maputil;

/**
 * Created by liuke on 2018/6/6.
 */

import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.net.Uri;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;


public class UtilMapModule extends ReactContextBaseJavaModule {


    public UtilMapModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "UtilMap";
    }

    /*
    检测手机是否安装了相应的地图app。返回的数据格式为:[{title:'dadasda',url:app地图URL},{title:'dadasda',url:app地图URL},{title:'dadasda',url:app地图URL}]
     */
    @ReactMethod
    public void findEvents(
            String lon,
            String lat,
            String address,
            Callback successCallback) throws Exception {

        WritableArray array = new WritableNativeArray();

        //百度地图app检测
        if (isAppInstalled(getReactApplicationContext(), "com.baidu.BaiduMap")) {
            WritableNativeMap ob = new WritableNativeMap();
            ob.putString("title", "百度地图");
            ob.putString("url", "baidumap://map/direction?origin=我的位置&destination=" + lat + "," + lon + "&mode=driving&coord_type=gcj02");
            array.pushMap(ob);
        }

        //高德地图app检测
        if (isAppInstalled(getReactApplicationContext(), "com.autonavi.minimap")) {
            WritableNativeMap ob = new WritableNativeMap();
            ob.putString("title", "高德地图");
            ob.putString("url", "androidamap://navi?sourceApplication=导航功能&backScheme=nav123456&lat=" + lat + "&lon=" + lon + "&dev=0&style=2");
            array.pushMap(ob);
        }

        //腾讯地图app检测
        if (isAppInstalled(getReactApplicationContext(), "com.tencent.map")) {
            WritableNativeMap ob = new WritableNativeMap();
            ob.putString("title", "腾讯地图");
            ob.putString("url", "qqmap://map/routeplan?from=我的位置&type=drive&tocoord=" + lat + "," + lon + "&to=" + address + "&coord_type=1&policy=0");
            array.pushMap(ob);
        }

        WritableNativeMap ob = new WritableNativeMap();
        ob.putString("title", "取消");
        ob.putString("url", "");
        array.pushMap(ob);

        successCallback.invoke(array);

    }

    @ReactMethod
    public void addEvent(String title,
                         String url,
                         String lon,
                         String lag,
                         String address) {
        //打开对应的app
        if(!url.equals("")){
            Intent i1 = new Intent();
            i1.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK|Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED);
            i1.setData(Uri.parse(url));
            getReactApplicationContext().startActivity(i1);
        }

    }

    /**
     * 查看是否安装了这个导航软件
     * 高德地图 com.autonavi.minimap
     * 百度地图 com.baidu.BaiduMap
     * 腾讯地图 com.tencent.map
     *
     * @param context
     * @param packagename
     * @return
     */
    public boolean isAppInstalled(Context context, String packagename) {
        PackageInfo packageInfo;
        try {
            packageInfo = context.getPackageManager().getPackageInfo(packagename, 0);
        } catch (Exception e) {
            packageInfo = null;
            e.printStackTrace();
        }

        if (packageInfo == null) {
            return false;
        } else {
            return true;
        }
    }
}