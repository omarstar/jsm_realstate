import Property from "@/components/Property";
import SearchFilters from "@/components/SearchFilters";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsFilter } from "react-icons/bs";

import noresult from '../assets/images/noresults.svg'
import { baseUrl, fetchApi } from "@/utils/fetchApi";

const Search = ({properties}) => {

    const [searchFilter, setSearchFilter] = useState(false)
    const router = useRouter();

    return ( 
        <Box >
            <Flex cursor="pointer" bg="gray.100" borderBottom="1px" p="2" fontWeight="black" fontSize="lg" justifyContent="center" alignItems="center" onClick={()=> setSearchFilter((prev)=> !prev)}>
                <Text>Search Property by filters</Text>
                <Icon paddingleft="2" w="7" as={BsFilter} />
            </Flex>
            {searchFilter && <SearchFilters />}
            <Text fontSize="2xl" p="4" fontWeight='bold'>
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap="wrap">
                {properties.map((property) => <Property property={property} key={property.id}/>)}
            </Flex>
            {
                properties.length === 0 && (
                    <Flex justifyContent="center" alignItems="center" flexDirection={"column"} marginTop="5" marginBottom="5">
                        <Image  alt="no search result" src={noresult} width="150"/>
                        <Text fontSize="xl" marginTop="3">No Results Found.</Text>
                    </Flex>
                )
            }
        </Box>
     );
}
 
export default Search;
// taking the props.query on load
export async function getServerSideProps({query}) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency ||'yearly';
    const minPrice = query.minPrice || '0'
    const maxPrice = query.maxPrice || '1000000'
    const roomsMin = query.roomsMin || '0'
    const bathsMin = query.bathsMin || '0'
    const sort = query.sort || 'price-desc'
    const areaMax = query.areaMax || '35000'
    const locationExternalIDs = query.locationExternalIDs || 5002;
    const categoryExternalIDs = query.categoryExternalIDs || 4;

    const data = await fetchApi(`${baseUrl}properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&rentFrequency=${rentFrequency}&minPrice=${minPrice}&maxPrice=${maxPrice}&roomsMin=${roomsMin}&bathsMin=${bathsMin}&sort=${sort}&areaMax=${areaMax}&categoryExternalIDs=${categoryExternalIDs}`)
    console.log('data', data)
    return {
      props: {
        properties: data?.hits,
      }
    }
  
  }