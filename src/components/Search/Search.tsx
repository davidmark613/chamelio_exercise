import React, { useState, useEffect } from 'react';
import { Box, Input, Button, VStack, Text } from '@chakra-ui/react';
import { Checkbox } from '@/components/ui/checkbox';

export const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [isCaseSensitive, setIsCaseSensitive] = useState<boolean>(false);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    Office.onReady(() => {
      console.log("Office is ready");
    });
  }, []);

  const handleSearch = async () => {
    if (!query) {
      return;
    }

    try {
      await Word.run(async (context) => {
        const searchResults = context.document.body.search(query, {
          matchCase: isCaseSensitive,
        });

        searchResults.load('text');
        await context.sync();

        const topResults = searchResults.items.slice(0, 3).map((item) => item.text);
        setResults(topResults);
      });
    } catch (error) {
      console.error('Error searching in document:', error);
    }
  };

  return (
    <Box p={4}>
      <VStack align="stretch">
        <Input
          placeholder="Enter search query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Checkbox
          checked={isCaseSensitive}
          onChange={() => setIsCaseSensitive(!isCaseSensitive)}
        >
          Case sensitive
        </Checkbox>
        <Button onClick={handleSearch} colorScheme="teal">
          Search
        </Button>
        <Box mt={4}>
          <Text fontSize="lg" fontWeight="bold">
            Search Results:
          </Text>
          {results.length > 0 ? (
            results.map((result, index) => (
              <Text key={index}>{result}</Text>
            ))
          ) : (
            <Text>No results found.</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
};