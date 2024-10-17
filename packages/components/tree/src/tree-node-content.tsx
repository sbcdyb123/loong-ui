import { defineComponent, inject } from 'vue'
import { treeInjectKey, treeNodeContentProps } from './tree'

export default defineComponent({
  name: 'LTreeNodeContent',
  props: treeNodeContentProps,
  setup(props) {
    const treeContext = inject(treeInjectKey)
    return () => {
      return treeContext?.slots.defalut
        ? treeContext?.slots.defalut!({
            node: props.node
          })
        : props.node?.label
    }
  }
})
