//
//  Neumorph.swift
//  NeomorphApp
//
//  Created by Никита Подрезов on 25.02.2021.
//

import SwiftUI
import Neumorphic

extension Color {
    static let neuBackground = Color(hex: "dddddd")
    static let dropShadow = Color(hex: "aeaec0").opacity(0.4)
    static let dropLight = Color(hex: "ffffff")
}

extension Color {
    init(hex: String) {
        let scanner = Scanner(string: hex)
        scanner.scanLocation = 0
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
  @Published var color: String = ""
}

struct Neumorph : View {
  @ObservedObject var props = NeumorphProps()
  
  var body: some View {
    RoundedRectangle(cornerRadius: self.props.borderRadius)
      .fill(Color.neuBackground)
      .frame(width: 150, height: 150)
      .shadow(color: .dropShadow, radius: 15, x: 10, y: 10)
      .shadow(color: .dropLight, radius: 15, x: -10, y: -10)
//      .fill(Color.init(UIColor.init(hexString: self.props.color, alpha: 1)))
      .softOuterShadow()
  }
}
