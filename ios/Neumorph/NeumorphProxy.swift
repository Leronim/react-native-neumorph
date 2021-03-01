//
//  NeumorphProxy.swift
//  NeomorphApp
//
//  Created by Никита Подрезов on 26.02.2021.
//

import SwiftUI

@objcMembers class NeumorphProxy: NSObject {
  private var vc = UIHostingController(rootView: Neumorph())
  
  static let storage = NSMutableDictionary()
  
  var borderRadius: CGFloat {
    set { vc.rootView.props.borderRadius = newValue }
    get { return vc.rootView.props.borderRadius }
  }
  
  var color: NSString {
    set { vc.rootView.props.color = newValue }
    get { return vc.rootView.props.color }
  }
  
  var inner: Bool {
    set { vc.rootView.props.inner = newValue }
    get { return vc.rootView.props.inner }
  }
  
  var lightShadow: NSString {
    set { vc.rootView.props.lightShadow = newValue }
    get { return vc.rootView.props.lightShadow }
  }
  
  var darkShadow: NSString {
    set { vc.rootView.props.darkShadow = newValue }
    get { return vc.rootView.props.darkShadow }
  }
  
  var shadowOpacity: Double {
    set { vc.rootView.props.opacity = newValue }
    get { return vc.rootView.props.opacity }
  }
  
  var shadowRadius: CGFloat {
    set { vc.rootView.props.radius = newValue }
    get { return vc.rootView.props.radius }
  }
  
  var onCountChange: RCTBubblingEventBlock {
    set { vc.rootView.props.onCountChange = newValue }
    get { return vc.rootView.props.onCountChange }
  }
  
  var view: UIView {
    return vc.view
  }
}
