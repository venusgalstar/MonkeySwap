import axios from 'axios'
import { baseUrlStrapi } from 'config/constants/api'

const fetchTagsFromApi = async () => {
  try {
    const res = await axios.get(`${baseUrlStrapi}/tags`)
    const tagResult = res.data[0].tags

    return tagResult
  } catch (error) {
    console.error('fetchTagsFromApiError::', error)
    return null
  }
}

export default fetchTagsFromApi
