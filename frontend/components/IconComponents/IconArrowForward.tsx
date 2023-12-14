import * as React from "react"
import {ColorValue} from "react-native"
import Svg, {Path} from "react-native-svg"
const IconArrowForward = ({fill = "#F0F0F0"}: {fill?: ColorValue}) => (
  <Svg width={6} height={10} viewBox="0 0 6 10" fill="none">
    <Path
      d="M1 1L5 5L1 9"
      stroke={fill}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
export default IconArrowForward
