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
    view.neumorphicLayer?.lightShadowOpacity = 1
    view.neumorphicLayer?.darkShadowOpacity = 1
    view.neumorphicLayer?.shadowColor = UIColor.red.cgColor
    view.neumorphicLayer?.elementColor = UIColor.gray.cgColor
    view.neumorphicLayer?.edged = true
    return view
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
