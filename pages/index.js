import Link from 'next/link'
import Image from 'next/image'
// import styles from '@/styles/Home.module.css'
import { Box, Button, Flex, Text} from '@chakra-ui/react'

import { baseUrl, fetchApi } from '../utils/fetchApi'
import { propertyUrls } from '@/utils/constants'
import Property from './../components/Property';

const Banner = ({purpose, title1, title2, desc1, desc2, linkName, buttonText, imageUrl}) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontSize='sm' fontWeight="medium">{purpose}</Text>
      <Text fontSize="3xl" fontWeight="bold">{title1}<br />{title2}</Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">{desc1}<br/>{desc2}</Text>
      <Button fontSize="xl" bg="blue.300" color="white">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)
export default function Home({propertiesForSale, propertiesForRent}) {
  console.log('sale', propertiesForSale)
  console.log('rent', propertiesForRent)
  return (
    <Box>
      <Banner 
        purpose='RENT A HOME'
        title1="rental Homes for"
        title2="EVERYONE"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore renting"
        linkName="/search?purpose=for-rent"
        imageUrl="/images/view2.jpeg"
      />
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => 
          <Property property={property} key={property.id} />
        )}
      </Flex>
      <Banner 
        purpose='BUY A HOME'
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="/images/view2.jpeg"
      />
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property) => 
          <Property property={property} key={property.id} />
        )}
      </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}${propertyUrls.forSale}`)
  const propertyForRent = await fetchApi(`${baseUrl}${propertyUrls.forRent}`)
  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits
    }
  }

}
