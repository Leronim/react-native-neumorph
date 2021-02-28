//
//  Neumorph.m
//  NeomorphApp
//
//  Created by Никита Подрезов on 25.02.2021.
//

#import <Foundation/Foundation.h>
#import "React/RCTViewManager.h"
#import "React/RCTComponentEvent.h"
#import "NeomorphApp-Swift.h"

@interface NeumorphManager : RCTViewManager
//  @property (nonatomic, strong) NSString *color;
@end



@implementation NeumorphManager

RCT_EXPORT_MODULE()

RCT_EXPORT_SWIFTUI_PROPERTY(borderRadius, int, NeumorphProxy);

RCT_EXPORT_SWIFTUI_PROPERTY(inner, bool, NeumorphProxy);

RCT_EXPORT_SWIFTUI_PROPERTY(shadowOpacity, double, NeumorphProxy);

RCT_EXPORT_SWIFTUI_CALLBACK(onCountChange, RCTDirectEventBlock, NeumorphProxy);

- (UIView *)view {
  NeumorphProxy *proxy = [[NeumorphProxy alloc] init];
  UIView *view = [proxy view];
  NSMutableDictionary *storage = [NeumorphProxy storage];
  storage[[NSValue valueWithNonretainedObject:view]] = proxy;
  return view;
}

RCT_CUSTOM_VIEW_PROPERTY(color, NSString, NeumorphProxy) {
  NSString *params = json ? [RCTConvert NSString:json] : nil;
  NSMutableDictionary *storage = [NeumorphProxy storage];
  NeumorphProxy *proxy = storage[[NSValue valueWithNonretainedObject:view]];
  proxy.color = params;
}

RCT_CUSTOM_VIEW_PROPERTY(lightShadow, NSString, NeumorphProxy) {
  NSString *params = json ? [RCTConvert NSString:json] : nil;
  NSMutableDictionary *storage = [NeumorphProxy storage];
  NeumorphProxy *proxy = storage[[NSValue valueWithNonretainedObject:view]];
  proxy.lightShadow = params;
}

RCT_CUSTOM_VIEW_PROPERTY(darkShadow, NSString, NeumorphProxy) {
  NSString *params = json ? [RCTConvert NSString:json] : nil;
  NSMutableDictionary *storage = [NeumorphProxy storage];
  NeumorphProxy *proxy = storage[[NSValue valueWithNonretainedObject:view]];
  proxy.darkShadow = params;
}

@end
