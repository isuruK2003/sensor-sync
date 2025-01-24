import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { IconProps } from "react-native-vector-icons/Icon";

type IconLibrary = {
  [key: string]: React.ComponentType<IconProps>;
};

const iconLibraries: IconLibrary = {
  "ionicon": Ionicons,
  "material": MaterialIcons,
  "fontawesome": FontAwesome,
};

export function Icon({
  type = "ionicon",
  name = "alert-circle",
  size = 24,
  color = "black",
}: {
  type?: string;
  name?: string;
  size?: number;
  color?: string;
}) {
  const IconComponent = iconLibraries[type];

  if (!IconComponent) {
    console.warn(`Icon type "${type}" not recognized, defaulting to "ionicon".`);
    return null;
  }

  return <IconComponent name={name} size={size} color={color} />;
}
