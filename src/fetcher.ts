const fetcher = function (url: string) {
  console.log('...fetching...')
  return fetch(url).then((r) => r.json())
}

export default fetcher
