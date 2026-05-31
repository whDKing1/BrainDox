export function getIsGroup(option) {
  return option.type === 'group';
}
export function getIgnored(option) {
  return option.type === 'ignored';
}
export function patternMatched(pattern, value) {
  try {
    return !!(1 + value.toString().toLowerCase().indexOf(pattern.trim().toLowerCase()));
  } catch (_a) {
    return false;
  }
}
export function createTmOptions(valueField, childrenField) {
  const options = {
    getIsGroup,
    getIgnored,
    getKey(option) {
      if (getIsGroup(option)) {
        return option.name || option.key || 'key-required';
      }
      // Required for non-custom label & value field
      return option[valueField];
    },
    getChildren(option) {
      return option[childrenField];
    }
  };
  return options;
}
export function filterOptions(originalOpts, filter, pattern, childrenField) {
  if (!filter) return originalOpts;
  function traverse(options) {
    if (!Array.isArray(options)) return [];
    const filteredOptions = [];
    for (const option of options) {
      if (getIsGroup(option)) {
        const children = traverse(option[childrenField]);
        if (children.length) {
          filteredOptions.push(Object.assign({}, option, {
            [childrenField]: children
          }));
        }
      } else if (getIgnored(option)) {
        continue;
      } else if (filter(pattern, option)) {
        filteredOptions.push(option);
      }
    }
    return filteredOptions;
  }
  return traverse(originalOpts);
}
export function createValOptMap(options, valueField, childrenField) {
  const valOptMap = new Map();
  options.forEach(option => {
    if (getIsGroup(option)) {
      ;
      option[childrenField].forEach(selectGroupOption => {
        valOptMap.set(selectGroupOption[valueField], selectGroupOption);
      });
    } else {
      valOptMap.set(option[valueField], option);
    }
  });
  return valOptMap;
}