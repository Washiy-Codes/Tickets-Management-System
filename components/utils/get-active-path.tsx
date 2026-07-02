// import { closest } from "fastest-levenshtein";

// export const getActivePath = (path: string, paths: string[], excludePaths: string[]) => {
//   const closestPath = closest(path, paths);
//   const index = paths.indexOf(closestPath);

//   return { active: closestPath, activeIndex: index };
// };


import { closest } from "fastest-levenshtein";

export const getActivePath = (path: string, paths: string[], excludePaths: string[]) => {
  const closestPath = closest(path, paths);
  const isExcluded = excludePaths.includes(closestPath);

  if (isExcluded) {
    return { active: null, activeIndex: -1 };
  }
  const index = paths.indexOf(closestPath);


  return { active: closestPath, activeIndex: index };
};