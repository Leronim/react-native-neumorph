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
@class ColorProps;

@interface NeumorphManager : RCTViewManager
@end



@implementation NeumorphManager

RCT_EXPORT_MODULE()

RCT_EXPORT_SWIFTUI_PROPERTY(borderRadius, int, NeumorphProxy);
RCT_EXPORT_SWIFTUI_PROPERTY(color, string, NeumorphProxy);

RCT_EXPORT_SWIFTUI_CALLBACK(onCountChange, RCTDirectEventBlock, NeumorphProxy);

- (UIView *)view {
  NeumorphProxy *proxy = [[NeumorphProxy alloc] init];
  UIView *view = [proxy view];
  NSMutableDictionary *storage = [NeumorphProxy storage];
  storage[[NSValue valueWithNonretainedObject:view]] = proxy;
  return view;
}

@end
