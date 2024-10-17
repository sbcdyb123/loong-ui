import { createNameSpace } from '@loong/utils/create'
import { ReactNode } from 'react'
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'

export default defineComponent({
  name: 'LVirtualList',
  props: {
    size: {
      type: Number,
      default: 35
    },
    remain: {
      type: Number,
      default: 8
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { slots }) {
    const bem = createNameSpace('vl')
    const wrapperRef = ref<HTMLElement>()
    const barRef = ref<HTMLElement>()
    const state = reactive({
      // 计算显示的区域
      start: 0,
      end: props.remain
    })
    const prev = computed(() => {
      return Math.min(state.start, props.remain)
    })
    const next = computed(() => {
      return Math.min(props.remain, props.items.length - state.end)
    })
    const visibleData = computed(() => {
      return props.items
        .slice(state.start - prev.value, state.end + next.value)
        .map(node => {
          return slots.defalut?.({ node })
        }) as ReactNode
    })
    const offset = ref(0)
    const handleScroll = () => {
      // 根据当前的距离算
      const scrollTop = wrapperRef.value?.scrollTop ?? 0
      state.start = Math.floor(scrollTop / props.size) //划过去了多少个
      state.end = state.start + props.remain
      offset.value = (state.start - prev.value) * props.size
    }
    watch(
      () => props.items,
      () => {
        barRef.value!.style.height = props.items.length * props.size + 'px'
      }
    )
    onMounted(() => {
      wrapperRef.value!.style.height = props.remain * props.size + 'px'
      barRef.value!.style.height = props.items.length * props.size + 'px'
    })
    return () => {
      return (
        <div className={bem.b()} ref={wrapperRef} onScroll={handleScroll}>
          {/* 模拟总长度 */}
          <div className={bem.e('scroll-bar')} ref={barRef}></div>
          <div
            className={bem.e('scroll-list')}
            style={{ transform: `translate3d(0,${offset.value}px,0)` }}
          >
            {visibleData.value}
          </div>
        </div>
      )
    }
  }
})
