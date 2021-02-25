//
//  Neumorph.swift
//  NeomorphApp
//
//  Created by Никита Подрезов on 25.02.2021.
//

import Foundation
import UIKit
import AVFoundation
import EMTNeumorphicView
import MHSoftUI

@objc(RNCNeumorph)
class RNCNeumorph: RCTViewManager {
  
  override func view() -> UIView! {
    let view = EMTNeumorphicView()
    // Default is 1.
        view.neumorphicLayer?.lightShadowOpacity = 1

        // Default is 0.3.
        view.neumorphicLayer?.darkShadowOpacity = 1

        // Optional. if it is nil (default), elementBackgroundColor will be used as element color.
        view.neumorphicLayer?.elementColor = UIColor.white.cgColor
        
        // Adding a thin border on the edge of the element.
        view.neumorphicLayer?.edged = true
    return view
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
