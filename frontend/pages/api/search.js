
import fetch from 'node-fetch'

const defaultEndpoint = `https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=daad1edd856a5021&format=json&large_area=Z011`

export default async (req, res) => {
  let url = defaultEndpoint

  if (typeof req.query.key !== undefined) {
    url = `${url}&keyword=${req.query.keyword}&start=${req.query.start}`
  }


  url = encodeURI(url)

  const result = await fetch(url)
  res.json(result.body)
}