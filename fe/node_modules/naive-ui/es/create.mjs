import version from "./version.mjs";
function create({
  componentPrefix = 'N',
  components = []
} = {}) {
  const installTargets = [];
  function registerComponent(app, name, component) {
    const registered = app.component(componentPrefix + name);
    if (!registered) {
      app.component(componentPrefix + name, component);
    }
  }
  function install(app) {
    if (installTargets.includes(app)) return;
    installTargets.push(app);
    components.forEach(component => {
      const {
        name,
        alias
      } = component;
      registerComponent(app, name, component);
      if (alias) {
        alias.forEach(aliasName => {
          registerComponent(app, aliasName, component);
        });
      }
    });
  }
  return {
    version,
    componentPrefix,
    install
  };
}
export default create;