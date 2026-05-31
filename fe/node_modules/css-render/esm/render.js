import { parseSelectorPath } from './parse';
import { isMediaOrSupports } from './utils';
const kebabRegex = /[A-Z]/g;
function kebabCase(pattern) {
    return pattern.replace(kebabRegex, match => '-' + match.toLowerCase());
}
/** TODO: refine it to solve nested object */
function unwrapProperty(prop, indent = '  ') {
    if (typeof prop === 'object' && prop !== null) {
        return (' {\n' +
            Object.entries(prop).map(v => {
                return indent + `  ${kebabCase(v[0])}: ${v[1]};`;
            }).join('\n') +
            '\n' + indent + '}');
    }
    return `: ${prop};`;
}
/** unwrap properties */
function unwrapProperties(props, instance, params) {
    if (typeof props === 'function') {
        return props({
            context: instance.context,
            props: params
        });
    }
    return props;
}
function createStyle(selector, props, instance, params) {
    if (!props)
        return '';
    // eslint-disable-next-line
    const unwrappedProps = unwrapProperties(props, instance, params);
    if (!unwrappedProps)
        return '';
    if (typeof unwrappedProps === 'string') {
        return `${selector} {\n${unwrappedProps}\n}`;
    }
    const propertyNames = Object.keys(unwrappedProps);
    if (propertyNames.length === 0) {
        if (instance.config.keepEmptyBlock)
            return selector + ' {\n}';
        return '';
    }
    const statements = selector
        ? [
            selector + ' {'
        ]
        : [];
    propertyNames.forEach(propertyName => {
        const property = unwrappedProps[propertyName];
        if (propertyName === 'raw') {
            statements.push('\n' + property + '\n');
            return;
        }
        propertyName = kebabCase(propertyName);
        if (property !== null && property !== undefined) {
            statements.push(`  ${propertyName}${unwrapProperty(property)}`);
        }
    });
    if (selector) {
        statements.push('}');
    }
    return statements.join('\n');
}
function loopCNodeListWithCallback(children, options, callback) {
    /* istanbul ignore if */
    if (!children)
        return;
    children.forEach(child => {
        if (Array.isArray(child)) {
            loopCNodeListWithCallback(child, options, callback);
        }
        else if (typeof child === 'function') {
            const grandChildren = child(options);
            if (Array.isArray(grandChildren)) {
                loopCNodeListWithCallback(grandChildren, options, callback);
            }
            else if (grandChildren) {
                callback(grandChildren);
            }
        }
        else if (child) {
            callback(child);
        }
    });
}
function traverseCNode(node, selectorPaths, styles, instance, params) {
    const $ = node.$;
    let blockSelector = '';
    if (!$ || typeof $ === 'string') {
        if (isMediaOrSupports($)) {
            blockSelector = $;
        }
        else {
            // as a string selector
            selectorPaths.push($);
        }
    }
    else if (typeof $ === 'function') {
        const selector = $({
            context: instance.context,
            props: params
        });
        if (isMediaOrSupports(selector)) {
            blockSelector = selector;
        }
        else {
            // as a lazy selector
            selectorPaths.push(selector);
        }
    }
    else { // as a option selector
        if ($.before)
            $.before(instance.context);
        if (!$.$ || typeof $.$ === 'string') {
            if (isMediaOrSupports($.$)) {
                blockSelector = $.$;
            }
            else {
                // as a string selector
                selectorPaths.push($.$);
            }
        }
        else /* istanbul ignore else */ if ($.$) {
            const selector = $.$({
                context: instance.context,
                props: params
            });
            if (isMediaOrSupports(selector)) {
                blockSelector = selector;
            }
            else {
                // as a lazy selector
                selectorPaths.push(selector);
            }
        }
    }
    const selector = parseSelectorPath(selectorPaths);
    const style = createStyle(selector, node.props, instance, params);
    if (blockSelector) {
        styles.push(`${blockSelector} {`);
    }
    else if (style.length) {
        styles.push(style);
    }
    if (node.children) {
        loopCNodeListWithCallback(node.children, {
            context: instance.context,
            props: params
        }, childNode => {
            if (typeof childNode === 'string') {
                const style = createStyle(selector, { raw: childNode }, instance, params);
                styles.push(style);
            }
            else {
                traverseCNode(childNode, selectorPaths, styles, instance, params);
            }
        });
    }
    selectorPaths.pop();
    if (blockSelector) {
        styles.push('}');
    }
    if ($ && $.after)
        $.after(instance.context);
}
export function render(node, instance, props) {
    const styles = [];
    traverseCNode(node, [], styles, instance, props);
    return styles.join('\n\n');
}
