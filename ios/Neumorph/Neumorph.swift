//
//  Neumorph.swift
//  NeomorphApp
//
//  Created by Никита Подрезов on 25.02.2021.
//

import SwiftUI
import Neumorphic

extension Color {
    static let neuBackground = Color(hex: "ffffff")
    static let dropShadow = Color(hex: "000000").opacity(0.4)
    static let dropLight = Color(hex: "ffffff")
}

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
}

struct Neumorph : View {
  @ObservedObject var props = NeumorphProps()
  
  var innerFigure: some View {
    RoundedRectangle(cornerRadius: self.props.borderRadius)
    .fill(Color(hex: self.props.color as String))
    .softInnerShadow(
      RoundedRectangle(cornerRadius: self.props.borderRadius),
      darkShadow: Color(hex: self.props.darkShadow as String).opacity(self.props.opacity),
      lightShadow: Color(hex: self.props.lightShadow as String).opacity(self.props.opacity),
      spread: 0.1,
      radius: self.props.radius
    );
  }
  
  var outerFigure: some View {
    RoundedRectangle(cornerRadius: self.props.borderRadius)
      .fill(Color(hex: self.props.color as String))
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
