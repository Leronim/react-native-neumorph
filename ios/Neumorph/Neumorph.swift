//
//  Neumorph.swift
//  NeomorphApp
//
//  Created by Никита Подрезов on 25.02.2021.
//

import SwiftUI
import Neumorphic

extension Color {
    init(hex: String) {
        let scanner = Scanner(string: hex)
        var rgbValue: UInt64 = 0
        scanner.scanHexInt64(&rgbValue)

        let r = (rgbValue & 0xff0000) >> 16
        let g = (rgbValue & 0xff00) >> 8
        let b = rgbValue & 0xff

        self.init(red: Double(r) / 0xff, green: Double(g) / 0xff, blue: Double(b) / 0xff)
    }
}

class NeumorphProps : ObservableObject {
  @Published var borderRadius: CGFloat = 0
  @Published var onCountChange: RCTDirectEventBlock = { _ in }
  @Published var color: NSString = "ffffff"
  @Published var inner: Bool = false
  @Published var lightShadow: NSString = ""
  @Published var darkShadow: NSString = ""
  @Published var opacity: Double = 1
  @Published var radius: CGFloat = 5
  @Published var width: CGFloat = 50
  @Published var height: CGFloat = 50
}

struct Neumorph : View {
  @ObservedObject var props = NeumorphProps()
  
  var circleInnerFigure: some View {
    Circle()
    .fill(Color(hex: self.props.color as String))
      .frame(width: self.props.width, height: self.props.height)
    .softInnerShadow(
      Circle(),
      darkShadow: Color(hex: self.props.darkShadow as String).opacity(self.props.opacity),
      lightShadow: Color(hex: self.props.lightShadow as String).opacity(self.props.opacity),
      spread: 0.1,
      radius: self.props.radius
    );
  }
  
  var circleOuterFigure: some View {
    Circle()
      .fill(Color(hex: self.props.color as String))
      .frame(width: self.props.width, height: self.props.height)
      .softOuterShadow(
        darkShadow: Color(hex: self.props.darkShadow as String).opacity(self.props.opacity),
        lightShadow: Color(hex: self.props.lightShadow as String).opacity(self.props.opacity),
        radius: self.props.radius
      );
  }
  
  var innerFigure: some View {
    //TODO: Сделать привязку к spread
    RoundedRectangle(cornerRadius: self.props.borderRadius)
    .fill(Color(hex: self.props.color as String))
    .frame(width: self.props.width, height: self.props.height)
    .softInnerShadow(
      RoundedRectangle(cornerRadius: self.props.borderRadius),
      darkShadow: Color(hex: self.props.darkShadow as String).opacity(self.props.opacity),
      lightShadow: Color(hex: self.props.lightShadow as String).opacity(self.props.opacity),
      spread: 0.1,
      radius: self.props.radius
    );
  }
  
  var outerFigure: some View {
    //TODO: Сделать привязку в offset
    RoundedRectangle(cornerRadius: self.props.borderRadius)
      .fill(Color(hex: self.props.color as String))
      .frame(width: self.props.width, height: self.props.height)
      .softOuterShadow(
        darkShadow: Color(hex: self.props.darkShadow as String).opacity(self.props.opacity),
        lightShadow: Color(hex: self.props.lightShadow as String).opacity(self.props.opacity),
        radius: self.props.radius
      );
  }
  
  var body: some View {
    if(self.props.inner) {
        innerFigure
    } else {
        outerFigure
    }
  }
}
