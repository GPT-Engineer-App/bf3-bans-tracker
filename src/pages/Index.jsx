import React, { useState, useEffect } from "react";
import { Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, Link, Spinner, Flex, Image } from "@chakra-ui/react";

const Index = () => {
  const [bans, setBans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBans = async () => {
      try {
        const response = await fetch("https://www.pbbans.com/api/v1/bans?limit=10&game=bf3");
        const data = await response.json();
        setBans(data.bans);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching bans:", error);
        setIsLoading(false);
      }
    };

    fetchBans();
  }, []);

  return (
    <Box maxWidth="800px" margin="auto" padding={4}>
      <Flex align="center" mb={8}>
        <Image src="https://images.unsplash.com/photo-1620288627223-53302f4e8c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxiYXR0bGVmaWVsZCUyMDMlMjBsb2dvfGVufDB8fHx8MTcxMDQ3NDM4NHww&ixlib=rb-4.0.3&q=80&w=1080" alt="BF3 Logo" width="100px" mr={4} />
        <Heading as="h1" size="xl">
          Latest Battlefield 3 Bans
        </Heading>
      </Flex>
      {isLoading ? (
        <Flex justify="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Player</Th>
              <Th>Reason</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bans.map((ban) => (
              <Tr key={ban.id}>
                <Td>
                  <Link href={`https://www.pbbans.com/mbi-viewban-${ban.id}.html`} isExternal>
                    {ban.player_name}
                  </Link>
                </Td>
                <Td>{ban.reason}</Td>
                <Td>{new Date(ban.created_at).toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <Text mt={8} textAlign="center">
        Data provided by{" "}
        <Link href="https://www.pbbans.com/" isExternal>
          PBBans
        </Link>
      </Text>
    </Box>
  );
};

export default Index;
