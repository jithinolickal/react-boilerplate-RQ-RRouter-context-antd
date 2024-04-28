import { useSearchParams } from "react-router-dom"

/**
 * Custom hook for synchronizing state with query parameters in the URL.
 *
 * @returns An object containing the current values of all query parameters,
 * and a function to update these values.
 */
const useQueryParams = (): [
  Record<string, string>,
  (newParams: Record<string, string>) => void,
] => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Convert the URLSearchParams instance into a plain object
  const paramsObject: Record<string, string> = Array.from(searchParams).reduce(
    (obj, [key, value]) => ({ ...obj, [key]: value }),
    {},
  )

  const setParams = (newParams: Record<string, string>) => {
    setSearchParams(newParams)
  }

  return [paramsObject, setParams]
}

export default useQueryParams
