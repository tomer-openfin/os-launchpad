/**
 * Take an OpenFin configuration as a string, and transform it based on some options.
 *
 * @param {string} config
 * @param {Object} options
 *
 * @returns {string}
 */
module.exports = (configString, { rootUrl, runtimeVersion, isProduction = false }) => {
  const updatedConfigString = configString.replace(/%ROOT_URL%/g, rootUrl);
  const config = JSON.parse(updatedConfigString);

  if (runtimeVersion) {
    config.runtime.version = runtimeVersion;
  }

  // Disable the context menu in production.
  // config.startup_app.contextMenu = !isProduction;

  return JSON.stringify(config, null, 4);
};
