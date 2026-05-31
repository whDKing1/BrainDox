import { computed, defineComponent, h, inject, onMounted, ref, toRef, watch } from 'vue';
import { logInjectionKey } from "./context.mjs";
export default defineComponent({
  props: {
    line: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const {
      trimRef,
      highlightRef,
      languageRef,
      mergedHljsRef
    } = inject(logInjectionKey);
    const selfRef = ref(null);
    const maybeTrimmedLinesRef = computed(() => {
      return trimRef.value ? props.line.trim() : props.line;
    });
    function setInnerHTML() {
      if (selfRef.value) {
        selfRef.value.innerHTML = generateCodeHTML(languageRef.value, maybeTrimmedLinesRef.value);
      }
    }
    function generateCodeHTML(language, code) {
      const {
        value: hljs
      } = mergedHljsRef;
      if (hljs) {
        if (language && hljs.getLanguage(language)) {
          return hljs.highlight(code, {
            language
          }).value;
        }
      }
      return code;
    }
    onMounted(() => {
      if (highlightRef.value) {
        setInnerHTML();
      }
    });
    watch(toRef(props, 'line'), () => {
      if (highlightRef.value) {
        setInnerHTML();
      }
    });
    return {
      highlight: highlightRef,
      selfRef,
      maybeTrimmedLines: maybeTrimmedLinesRef
    };
  },
  render() {
    const {
      highlight,
      maybeTrimmedLines
    } = this;
    return h("pre", {
      ref: "selfRef"
    }, highlight ? null : maybeTrimmedLines);
  }
});