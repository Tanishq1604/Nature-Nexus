import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const Product = ({ img, head, text, price }) => {
  if (!img || !head || !text || !price) return null;

  return (
    <Card maxW="sm" maxH="lg">
      <CardBody>
        <Image
          w="420px"
          h="200px"
          src={img}
          alt={head}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{head}</Heading>
          <Text>{text}</Text>
          <Text color="blue.600" fontSize="2xl">
            {price} karma
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="green">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="green">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Product;

