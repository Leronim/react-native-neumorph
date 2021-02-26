//
//  NeumorphProxy.swift
//  NeomorphApp
//
//  Created by Никита Подрезов on 26.02.2021.
//

import SwiftUI

@available(iOS 13.0, *)
@objc(SwiftUIStarter)
class SwiftUIProxy: RCTViewManager {
    
  private let vc = UIHostingController(rootView: SwiftUIComponent())
  
  var borderRadius: Int {
    set {
      vc.rootView.props.borderRadius = newValue
    }
    get {
      return vc.rootView.props.borderRadius
    }
  }
  
  override func view() -> UIView {
      return vc.view
  }
}
