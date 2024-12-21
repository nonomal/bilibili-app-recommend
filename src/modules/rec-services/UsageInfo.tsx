import type { ETab } from '$components/RecHeader/tab-enum'
import type { ServiceMap } from './service-map'

export const UsageInfo = memo(function <T extends ETab>({
  tab,
  service,
}: {
  tab: T
  service: ServiceMap[T]
}) {
  return (
    <>
      Tab = {tab}
      {service?.usageInfo}
    </>
  )
})
