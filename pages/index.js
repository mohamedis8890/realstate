import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

export const Banner = ({purpose, title1, title2, desc1, desc2, buttonText, linkName, imageURL})=> (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
    <Image src={imageURL} width={500} height={300} />
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
      <Text fontSize='3xl' paddingTop='3' fontWeight='bold'>{title1}<br />{title2}</Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>{desc1}<br />{desc2}</Text>
      <Button fontSize='xl' bg='blue.300' color='white'>
	<Link href={linkName}><a>{buttonText}</a></Link>
      </Button>
    </Box>
  </Flex>
);

export default function Home()           {
  return (
    <Box>
      <Banner
	  purpose='Rent A Home'
	  title1="Rental Homes for"
	  title2="Everyone"
	  desc1="Explore from Apartments, builder floores, villas"
	  desc2="and more"
	  buttonText="Explore Renting"
	  linkName='/search?purpose=for-rent'
	  imageURL='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      ></Banner>

      <Banner
	  purpose='Buy A Home'
	  title1="Find, Buy & Own Your"
	  title2="Dream Home"
	  desc1="Explore from Apartments, builder floores, villas"
	  desc2="and more"
	  buttonText="Explore Buying"
	  linkName='/search?purpose=for-sale'
          imageURL='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
	  ></Banner>
    </Box>
  )
}
