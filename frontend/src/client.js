import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId:import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset:'production',
    apiVersion:'2023-04-13',
    useCdn: true,
    token: import.meta.env.VITE_SANITY_API_KEY,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source) => builder.image(source)