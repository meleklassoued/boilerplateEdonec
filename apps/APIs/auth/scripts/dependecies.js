const path = require("path");

const localPackageJson = require("../package.json");
const {
  extractInternalPackagesFromPackageJson,
  resolveMultipleInternalPackageDirs,
  getAllPackageJsonDepsRecursive,
  getPackageNameFromPath,
  copyPackage,
} = require("./lib");

const internalImportedPackageNames =
  extractInternalPackagesFromPackageJson(localPackageJson);
const internalPackageDirs = resolveMultipleInternalPackageDirs(
  internalImportedPackageNames
);

const allDependecyTreeDirs =
  getAllPackageJsonDepsRecursive(internalPackageDirs);

const allDependecyTreePackageNames = allDependecyTreeDirs.map((packagePath) =>
  getPackageNameFromPath(packagePath)
);

console.log({
  internalImportedPackageNames,
  internalPackageDirs,
  allDependecyTreeDirs,
});
allDependecyTreeDirs.forEach((dep) => copyPackage(dep));
// TODO: clean up the deps post build
module.exports = [];
