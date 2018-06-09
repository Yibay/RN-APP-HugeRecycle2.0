//
//  UtilMap.m
//  HugeRecycle2_0
//
//  Created by LiuKe on 2018/6/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "UtilMap.h"
#import <CoreLocation/CoreLocation.h>
#import <MapKit/MapKit.h>


@implementation UtilMap

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name url:(NSString *)url lon:(NSString *)lon lat:(NSString *) lat address:(NSString*) address)
{
  RCTLogInfo(@"地图app=== %@ url %@-----经度:%@------纬度:%@------地址:%@", name, url,lon,lat,address);
  
  if ([url isEqualToString : @"ios"]) {
    [self appleMap:lon andB:lat andC:address];
  }else{
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]];
  }
  
}

RCT_EXPORT_METHOD(findEvents:(NSString *)lon lat:(NSString *)lat address:(NSString*)address resolver:(RCTResponseSenderBlock)callback)
{
  NSMutableArray *maps = [NSMutableArray array];
  
  //苹果地图
  if ([[UIApplication sharedApplication]canOpenURL:[NSURL URLWithString:@"http://maps.apple.com/"]]) {
    NSMutableDictionary *iosMapDic = [NSMutableDictionary dictionary];
    iosMapDic[@"title"] = @"苹果地图";
    iosMapDic[@"url"] = @"ios";
    [maps addObject:iosMapDic];
  }
  //百度地图
  if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"baidumap://"]]) {
    NSMutableDictionary *baiduMapDic = [NSMutableDictionary dictionary];
    baiduMapDic[@"title"] = @"百度地图";
    NSString *urlString = [[NSString stringWithFormat:@"baidumap://map/direction?origin={{我的位置}}&destination=%f,%f&mode=driving&coord_type=gcj02",[lat doubleValue],[lon doubleValue]] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    baiduMapDic[@"url"] = urlString;
    [maps addObject:baiduMapDic];
  }
  //高德地图
  if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"iosamap://"]]) {
    NSMutableDictionary *gaodeMapDic = [NSMutableDictionary dictionary];
    gaodeMapDic[@"title"] = @"高德地图";
    NSString *urlString = [[NSString stringWithFormat:@"iosamap://navi?sourceApplication=%@&backScheme=%@&lat=%f&lon=%f&dev=0&style=2",@"导航功能",@"nav123456",[lat doubleValue],[lon doubleValue]] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    gaodeMapDic[@"url"] = urlString;
    [maps addObject:gaodeMapDic];
  }
  //腾讯地图
  if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"qqmap://"]]) {
    NSMutableDictionary *qqMapDic = [NSMutableDictionary dictionary];
    qqMapDic[@"title"] = @"腾讯地图";
    NSString *urlString = [[NSString stringWithFormat:@"qqmap://map/routeplan?from=我的位置&type=drive&tocoord=%f,%f&to=%@&coord_type=1&policy=0",[lat doubleValue],[lon doubleValue],address] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    qqMapDic[@"url"] = urlString;
    [maps addObject:qqMapDic];
  }
  
  NSMutableDictionary *cancalMapDic = [NSMutableDictionary dictionary];
  cancalMapDic[@"title"] = @"取消";
  [maps addObject:cancalMapDic];
  
  //  RCTLogInfo(@"地图app===经度:",maps);
  
  callback(@[maps]);
  
}

//苹果地图
//跳转到苹果自带地图
- (void)appleMap:(NSString*)lon andB:(NSString*)lat andC:(NSString*)address{
  RCTLogInfo(@"地图app===经度:%@------纬度:%@------地址:%@",lon,lat,address);
  
    MKMapItem *currentLoc = [MKMapItem mapItemForCurrentLocation];
  
    MKMapItem *toLocation = [[MKMapItem alloc] initWithPlacemark:[[MKPlacemark alloc] initWithCoordinate:CLLocationCoordinate2DMake([lat doubleValue], [lon doubleValue]) addressDictionary:nil]];
  
    NSArray *items = @[currentLoc,toLocation];
    NSDictionary *dic = @{
                          //MKLaunchOptionsDirectionsModeKey 指定导航模式
                          //NSString * const MKLaunchOptionsDirectionsModeDriving; 驾车
                          //NSString * const MKLaunchOptionsDirectionsModeWalking; 步行
                          //NSString * const MKLaunchOptionsDirectionsModeTransit; 公交
                          MKLaunchOptionsDirectionsModeKey : MKLaunchOptionsDirectionsModeDriving,
                          MKLaunchOptionsMapTypeKey : @(MKMapTypeStandard),
                          MKLaunchOptionsShowsTrafficKey : @(YES)
                          };
    [MKMapItem openMapsWithItems:items launchOptions:dic];
  
  //MKMapItem 使用场景: 1. 跳转原生地图 2.计算线路
//  MKMapItem *currentLocation = [MKMapItem mapItemForCurrentLocation];
//  //地理编码器
//  CLGeocoder *geocoder = [[CLGeocoder alloc] init];
//  //我们假定一个终点坐标，测试地址:121.226669,31.998277
//  [geocoder geocodeAddressString:address completionHandler:^(NSArray<CLPlacemark *> * _Nullable placemarks, NSError * _Nullable error) {
//    CLPlacemark *endPlacemark  = placemarks.lastObject;
//    RCTLogInfo(@"Longitude = %f", endPlacemark.location.coordinate.longitude);
//    RCTLogInfo(@"Latitude = %f", endPlacemark.location.coordinate.latitude);
//    //创建一个地图的地标对象o
//    MKPlacemark *endMKPlacemark = [[MKPlacemark alloc] initWithPlacemark:endPlacemark];
//    //在地图上标注一个点(终点)
//    MKMapItem *endMapItem = [[MKMapItem alloc] initWithPlacemark:endMKPlacemark];
//    //MKLaunchOptionsDirectionsModeKey 指定导航模式
//    //NSString * const MKLaunchOptionsDirectionsModeDriving; 驾车
//    //NSString * const MKLaunchOptionsDirectionsModeWalking; 步行
//    //NSString * const MKLaunchOptionsDirectionsModeTransit; 公交
//    [MKMapItem openMapsWithItems:@[currentLocation, endMapItem]
//                   launchOptions:@{MKLaunchOptionsDirectionsModeKey: MKLaunchOptionsDirectionsModeDriving,MKLaunchOptionsShowsTrafficKey: [NSNumber numberWithBool:YES]}];
//
//  }];
}

@end
