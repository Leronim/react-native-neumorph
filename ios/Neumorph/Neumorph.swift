//
//  Neumorph.swift
//  NeomorphApp
//
//  Created by Никита Подрезов on 25.02.2021.
//

import SwiftUI
import Neumorphic

extension UIColor {
    convenience init(hexString: String, alpha: CGFloat = 1.0) {
        let hexString: String = hexString.trimmingCharacters(in: CharacterSet.whitespacesAndNewlines)
        let scanner = Scanner(string: hexString)

        if (hexString.hasPrefix("#")) {
            scanner.scanLocation = 1
        }

        var color: UInt32 = 0
        scanner.scanHexInt32(&color)

        let mask = 0x000000FF
        let r = Int(color >> 16) & mask
        let g = Int(color >> 8) & mask
        let b = Int(color) & mask

        let red   = CGFloat(r) / 255.0
        let green = CGFloat(g) / 255.0
        let blue  = CGFloat(b) / 255.0

        self.init(red:red, green:green, blue:blue, alpha:alpha)
    }

    func toHexString() -> String {
        var r:CGFloat = 0
        var g:CGFloat = 0
        var b:CGFloat = 0
        var a:CGFloat = 0

        getRed(&r, green: &g, blue: &b, alpha: &a)

        let rgb:Int = (Int)(r*255)<<16 | (Int)(g*255)<<8 | (Int)(b*255)<<0

        return String(format:"#%06x", rgb)
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
      .fill(Color.init(red: 221, green: 221, blue: 221, opacity: 1.0))
      .frame(width: 150, height: 150)
      .shadow(color: Color.init(red: 225, green: 0, blue: 0), radius: 8, x: -8, y: -8)
      .shadow(color: Color.init(red: 0, green: 255, blue: 0), radius: 8, x: 8, y: 8)
//      .fill(Color.init(UIColor.init(hexString: self.props.color, alpha: 1)))
      .softOuterShadow()
  }
}
