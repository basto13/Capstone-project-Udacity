const { getImage } = require('../client/js/handleSubmit')

describe('handle submit functions', () => {
    afterEach(() => {
        global.fetch.mockClear();
    });

    test('getImage', async () => {
        // Arrange
        const mockJson = {};
        const mockResponse = {
            json: () => Promise.resolve(mockJson),
        };
        global.fetch = jest.fn(url => Promise.resolve(mockResponse));
        const baseURL = 'http://localhost:8080?'
        const location = 'Russia'
        const keyUrl = 'myid'

        // Act
        const response = await getImage(baseURL, location, keyUrl);

        // Assert
        expect(global.fetch).toHaveBeenCalledWith(
            'http://localhost:8080?key=myid&q=Russia'
        );
        expect(response).toBe(mockJson);
    })
})
