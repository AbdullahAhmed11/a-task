
import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  Flex
} from '@chakra-ui/react';

const App = () => {
  const [malfunctionTypes, setMalfunctionTypes] = useState([]);
  const [importanceDegrees, setImportanceDegrees] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [supposedTime, setSupposedTime] = useState('');
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [startRecording, setStartRecording] = useState('');

  const toast = useToast();

  const handleMalfunctionChange = (selectedOptions) => {
    setMalfunctionTypes(selectedOptions);
  };

  const handleImportanceChange = (selectedOptions) => {
    setImportanceDegrees(selectedOptions);
  };

  const handleDeleteRow = (id) => {
    const updatedRequests = maintenanceRequests.filter((request) => request.id !== id);
    setMaintenanceRequests(updatedRequests);
  };

  const handleAddRow = () => {
    // Check if the current form is valid before adding a new row
    if (validateForm()) {
      const newMaintenanceRequest = {
        id: maintenanceRequests.length + 1,
        malfunctionTypes,
        importanceDegrees,
        deliveryDate,
        supposedTime,
      };

      setMaintenanceRequests([...maintenanceRequests, newMaintenanceRequest]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newMaintenanceRequest = {
        id: maintenanceRequests.length + 1,
        malfunctionTypes,
        importanceDegrees,
        deliveryDate,
        supposedTime,
      };

      setMaintenanceRequests([...maintenanceRequests, newMaintenanceRequest]);
    }
  };

  const validateForm = () => {
    if (malfunctionTypes.length === 0 || importanceDegrees.length === 0 || !deliveryDate || !supposedTime) {
      toast({
        title: 'Error',
        description: 'All fields are required.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    const currentDate = new Date();
    const selectedDate = new Date(deliveryDate + ' ' + supposedTime);
    if (selectedDate < currentDate) {
      toast({
        title: 'Error',
        description: 'Selected delivery date is in the past.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return false;
    }

    // Add additional validation as needed

    return true;
  };

  return (
    <Box >
      <form onSubmit={handleSubmit}>
        <Flex direction={{ base: "column", sm: "row" }} margin="auto">
          <FormControl mb="4">
            <FormLabel>Type of Malfunction:</FormLabel>
            <Select

              value={malfunctionTypes}
              onChange={(e) => handleMalfunctionChange(Array.from(e.target.selectedOptions, (option) => option.value))}
            >
              <option value="electrical">Electrical</option>
              <option value="mechanical">Mechanical</option>
              {/* Add more options as needed */}
            </Select>
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Degree of Importance:</FormLabel>
            <Select

              value={importanceDegrees}
              onChange={(e) => handleImportanceChange(Array.from(e.target.selectedOptions, (option) => option.value))}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Delivery Date:</FormLabel>
            <Input type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
          </FormControl>

          <FormControl mb="4">
            <FormLabel>Supposed Time for Repair:</FormLabel>
            <Input type="time" value={supposedTime} onChange={(e) => setSupposedTime(e.target.value)} />
          </FormControl>
        </Flex>



        <Button type="submit" colorScheme="teal" mr="2">
          Submit Request
        </Button>

        <Button onClick={handleAddRow} colorScheme="teal">
          Add Row
        </Button>
      </form>

      <Box mt="8">
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Name of Malfunction</Th>
              <Th>Details of Malfunction</Th>
              <Th>Supposed Time for Repair</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {maintenanceRequests.map((request) => (
              <Tr key={request.id}>
                <Td>{request.id}</Td>
                <Td>{request.malfunctionTypes.join(', ')}</Td>
                <Td>{request.importanceDegrees.join(', ')}</Td>
                <Td>{request.supposedTime}</Td>
                <Td>
                  <Checkbox onChange={() => handleDeleteRow(request.id)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default App;
