import { RefObject, useCallback, useRef, useState } from "react";
import { TUseTabType } from "../utils/types";

export const useTabType = (items:Array<RefObject<HTMLElement>>):TUseTabType => {
  const listRef = useRef<HTMLDivElement>(null)
  const [tabType, setTabType] = useState('bun')

  const onScroll = useCallback(() => {
    const listTop = (listRef.current as HTMLElement)?.getBoundingClientRect()?.top
    let id = ''
    let minDiff = Number.MAX_VALUE
    for (let item of items) {
      const diff = Math.abs(
        (item.current as HTMLElement)?.getBoundingClientRect().top - listTop,
      )
      if (diff >= 0 && minDiff > diff) {
        minDiff = diff
        id = (item.current as HTMLElement)?.id
      }
    }
    if (id && id !== tabType) setTabType(id)
  }, [items, tabType])

  return { listRef, onScroll, tabType }
};
