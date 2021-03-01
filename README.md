# Neumorph React Native

## Installation

### Step 1
Install <a href="https://docs.swmansion.com/react-native-reanimated/docs/installation" target="_blank">react-native-reanimated v2</a>

### Step 2

```bash 
cd ios && pod install && cd ..
```

## Usage

### Neumorph
Static Neumorph component
```jsx
import { Neumorph } from 'library-name';

...

<Neumorph
  inner // <- enable inner shadow
  basin // <- support only android
  darkShadowColor="#000000"
  lightShadowColor="#ffffff"
  style={{
      backgroundColor: '#dddddd',
      shadowOpacity: 0.3,
      shadowRadius: 4,
      borderRadius: 100,
      marginTop: 20,
      marginRight: 20,
      width: 150,
      height: 150,
  }}
>
  ...
</Neumorph>
```

<!-- ![Screeen Example](assets/RectangleNeumorph.png) -->
<!-- [<img src="assets/RectangleNeumorph.png" width="300" height="500"/>](assets/RectangleNeumorph.png) -->

### AnimatedNeumorph
Animated Neumorph component
```jsx
import { AnimatedNeumorph } from 'library-name';
import { useSharedValue, useAnimatedStyle, Easing, withTiming, useValue } from 'react-native-reanimated';

...

const width = useSharedValue(150);

...

const startAnimation = () => {
  width.value = withTiming(300, {
      duration: 300,
      easing: Easing.ease
  });
}

...

const animaStyle = useAnimatedStyle(() => {
  return {
    width: withTiming(width.value, {
        duration: 1500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1)
    })
  }
})

...

<AnimatedNeumorph
  inner
  style={[
    styleAnim1,
    { 
      backgroundColor: '#dddddd',
      shadowOpacity: 1,
      shadowRadius: 4,
      borderRadius: 50,
      marginTop: 20,
      height: 150,
      marginRight: 20
  }]}
/>
```