import { Request, Response } from 'express';
import { justifyTextHandler, wordCountHandler } from '../src/controllers/Controllers';

describe('Controllers', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    
    beforeEach(() => {
        mockRequest = {
            body: 'Test text',
            headers: {
                authorization: 'Bearer test-token'
            }
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
            setHeader: jest.fn()
        };
    });

    test('justifyTextHandler should handle valid text', () => {
        justifyTextHandler(mockRequest as Request, mockResponse as Response);
        expect(mockResponse.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    });
});