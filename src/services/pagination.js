export function buildPageUrl(resourceUrl, page) {
  const url = new URL(resourceUrl)

  url.searchParams.set('page', String(page))

  return url.toString()
}