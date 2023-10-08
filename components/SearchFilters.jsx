import {useState, useEffect} from 'react';
import {Flex, Text, Box, Input, Spinner, Icon, Button, Select} from '@chakra-ui/react';
import {useRouter} from 'next/router'
import { filterData, getFilterValues } from '@/utils/filterData';
import {MdCancel} from 'react-icons/md'
import Image from 'next/image'

import {baseUrl, fetchApi} from '../utils/fetchApi'
import noresult from "../assets/images/noresults.svg"

const SearchFilters = () => {
const [filters, setFilters] = useState(filterData);
const [searchTerm, setsearchTerm] = useState('');
const [locationData, setLocationData] = useState();
const [showLocations, setShowLocations] = useState(false)
const [loading, setloading] = useState(false);
const router = useRouter();

const searchProperties = (filterValues) => {
    const path = router.pathname;
    const {query} = router;

     const values = getFilterValues(filterValues);

     values.forEach(item => {
        if(item.value && filterValues?.[item.name]){
            query[item.name] = item.value
        }
     })

     router.push({pathname: path, query})
}

console.log('filters', filters)
    return ( 
        <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
            {filters.map(filter=>(
                <Box key={filter.queryName}>
                    <Select placeholder={filter.placeholder} w="fit-content" p="2" onChange={(e)=> searchProperties({ [filter.queryName]: e.target.value})}>
                        {filter?.items?.map(item => {
                            console.log('item.name', item.name)
                            return (
                                <option value={item.value} key={item.value}>{item.name}</option>
                            )
                            }
                        )}
                    </Select>
                </Box>
            ))}
            <Flex flexDir="column">
                <Button onClick={()=>setShowLocations(!showLocations)} border='1px' borderColor='gray.200' marginTop='2' >
                    Search Location
                </Button>
            </Flex>
        </Flex>
     );
}
 
export default SearchFilters;