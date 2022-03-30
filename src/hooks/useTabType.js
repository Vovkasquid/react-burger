import { useCallback, useRef, useState } from 'react'

export const useTabType = (items) => {
  const listRef = useRef()
  const [tabType, setTabType] = useState('bun')

  const onScroll = useCallback(() => {
    const listTop = listRef.current.getBoundingClientRect().top
    let id = ''
    let minDiff = Number.MAX_VALUE
    for (let item of items) {
      const diff = Math.abs(
        item.current.getBoundingClientRect().top - listTop,
      )
      if (diff >= 0 && minDiff > diff) {
        minDiff = diff
        id = item.current.id
      }
    }
    if (id && id !== tabType) setTabType(id)
  }, [items, tabType])

  return { listRef, onScroll, tabType }
};