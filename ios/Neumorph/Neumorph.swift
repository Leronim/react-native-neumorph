//
//  Neumorph.swift
//  NeomorphApp
//
//  Created by Никита Подрезов on 25.02.2021.
//

import SwiftUI
import Neumorphic

class NeumorphProps: ObservableObject {
  @Published var borderRadius: Int = 0
}

struct SwiftUIComponent: View {
  @ObservedObject var props = NeumorphProps()
  
    var body: some View {
      if(self.props.borderRadius > 50) {
        Circle().fill(Color.Neumorphic.main).softOuterShadow()
      } else {
        RoundedRectangle(cornerRadius: 20).fill(Color.Neumorphic.main).softOuterShadow()
      }
    }
  
    func requiresMainQueueSetup() -> Bool {
      return true
    }
}
