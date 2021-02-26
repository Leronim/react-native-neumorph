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
  
  var color: String {
    set { vc.rootView.props.color = newValue }
    get { return vc.rootView.props.color }
  }
  
  var onCountChange: RCTBubblingEventBlock {
    set { vc.rootView.props.onCountChange = newValue }
    get { return vc.rootView.props.onCountChange }
  }
  
  var view: UIView {
    return vc.view
  }
}
