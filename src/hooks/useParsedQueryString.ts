import { useRouter } from 'next/router'
import { parse, ParsedQs } from 'qs'
import { useMemo } from 'react'

export function parsedQueryString(search?: string): ParsedQs {
  return search && search.length > 1 ? parse(search, { parseArrays: false, ignoreQueryPrefix: true }) : {}
}

export default function useParsedQueryString(): ParsedQs {
  const { pathname } = useRouter()
  return useMemo(() => parsedQueryString(pathname), [pathname])
}
