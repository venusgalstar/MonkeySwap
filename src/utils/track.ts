declare const window: Window & { dataLayer: Record<string, unknown>[] }

function track({
  event,
  chain,
  data,
  value,
}: {
  event: string
  chain: number | undefined | string
  data: any
  value?: number | string
}): void {
  window.dataLayer?.push({ event, value, chain, ...data })
}

export default track
