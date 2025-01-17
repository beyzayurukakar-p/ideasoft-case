import axios from 'axios';

const mockAxios = jest.createMockFromModule('axios') as jest.Mocked<typeof axios>;

// this is the key to fix the axios.create() undefined error!
mockAxios.create = jest.fn(() => mockAxios);

export default mockAxios;
