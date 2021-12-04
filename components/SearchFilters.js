import {useEffect, useState} from "react"
import {Flex, Select, Box, Text, Input, Spinner, Icon, Button} from "@chakra-ui/react"
import {useRouter} from "next/router"
import {MdCancel} from "react-icons/md"
import Image from "next/image"

import noresult from "../assets/images/noresult.svg"
import { filterData, getFilterValues } from "../utils/filterData"
import {baseURL, fetchAPI} from "../utils/fetchAPI"

const SearchFilters = () => {
  const [filters]=useState(filterData)
  const [locationSearch, setLocationSearch] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);
  const [locationData, setLocationData] = useState()
  const [searchTerm, setSearchTerm]=useState('');
  const router = useRouter()

  useEffect(()=> {
    const fetchLocationData = async () => {
      if(!searchTerm) return
      setLoading(true)
      const data = await fetchAPI(
        `${baseURL}/auto-complete?query=${searchTerm}`
      )
      setLoading(false)
      console.log(data)
      if(data) {
        setLocationData(data.hits)
        setShowLocations(true)
      }

    }
    fetchLocationData()

  }, [searchTerm])

  const searchPropperties= filterValues =>{
    const path= router.pathname
    const {query} = router

    const values = getFilterValues(filterValues)
    values.forEach(item=> {
      if(item.value && filterValues?.[item.name])
        query[item.name] = item.value
    })

    router.push({pathname: path, query})
  }

  return (
    <>
    <Flex bg='gray.100' p='4' flexWrap='wrap' justifyContent='center'>
     
      
    
    {filters?.map(filter=> (
      <Box key={filter.queryName}>
        <Select 
        placeholder={filter.placeholder}
        p='2'
        w='fit-content'
        onChange={e=> searchPropperties({ [filter.queryName]: e.target.value })}
        >
          {filter?.items?.map(item => (
            <option value={item.value} key={item.value}>{item.name}</option>
          ))} 
        </Select>
      </Box>
    ))}
      
    </Flex>
<Flex flexDir='column'>
<Button onClick={()=> setLocationSearch(prevState=> !prevState)} border='1px' borderColor='gray.200' marginTop='2' >Search By Location</Button>
  {locationSearch && 
    <Flex flexDir='column' pos='relative' paddingTop='2'>
      <Input placeholder='location' value={searchTerm} onChange={(e)=> setSearchTerm(e.target.value)} w='300px' focusBorderColor='gray.300' />
      {searchTerm !== '' && (
        <Icon
         as={MdCancel}
        pos='absolute'
        cursor='pointer'
        right='5'
        top='5'
        zIndex='100'
        onClick={() => setSearchTerm('')}
        />
      )}
    </Flex>
  }
  {loading && <Spinner margin='auto' marginTop='3' />}
  {showLocations && 
    locationData.map(location=>(
      <Box key={location.id} onClick={() =>{
        searchPropperties({locationExternalIDs: location.externalID})
        setSearchTerm(location.name)
        setShowLocations(false)
        setLocationSearch(false)}}>
          <Text cursor='pointer' bg='gray.200' p='2' borderBottom='1px' borderColor='gray.100'>{location.name}</Text>

      </Box>))
  }
    {!loading && !locationData?.length && (
                  <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5' >
                    <Image src={noresult} alt='No Results' />
                    <Text fontSize='xl' marginTop='3'>
                      Waiting to search!
                    </Text>
                  </Flex>
                )}
  
    </Flex>
  </>
)
}

export default SearchFilters;
