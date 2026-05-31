import * as components from "./components.mjs";
import create from "./create.mjs";
const naive = create({
  components: Object.keys(components).map(key => components[key])
});
export default naive;
export const install = naive.install;