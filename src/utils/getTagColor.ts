export const getTagColor = (type: string) => {
  console.log(type);
  type = type.toLowerCase();
  if (type === "next") {
    return "#474747";
  } else if (type === "react") {
    return "#00d8ff";
  } else if (type === "fastapi") {
    return "#dda9a9";
  } else if (type === "flutter") {
    return "orange";
  } else if (type === "express") {
    return "#9a81b0";
  } else if (type === "c++") {
    return "#5599ff";
  } else if (type === "react-native") {
    return "#8e7158";
  } else if (type === "java") {
    return "#b07219";
  } else if (type === "python") {
    return "#FFD43B";
  } else if (type === "typescript") {
    return "#3178c6";
  } else if (type === "case study") {
    return "#ff6347";
  } else {
    console.log(type);
  }
};
