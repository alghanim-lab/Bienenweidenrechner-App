import { Dimensions } from "react-native"
import { getDimnsions } from "./GetDimnsions"

export function setPickerWidth (getDimnsions) {
return(
    getDimnsions> "700"
    ? { transform: [{ scaleX: 2 }, { scaleY: 2 }], top: 100 }
    : { transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }
)
}