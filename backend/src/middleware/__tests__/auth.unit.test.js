const { authenticate, authorize } = require('../auth.middleware');
const tokenManager = require('../../utils/tokenManager');
const prisma = require('../../config/database');

// Mock tokenManager and prisma
jest.mock('../../utils/tokenManager');
jest.mock('../../config/database', () => ({
  user: {
    findUnique: jest.fn()
  }
}));

describe('Auth Middleware - Unit Tests', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
      cookies: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe('authenticate middleware', () => {
    it('should authenticate valid token from Authorization header', async () => {
      const mockUser = { id: 'user-123', email: 'test@example.com', role: 'USER' };
      req.headers.authorization = 'Bearer valid-token';
      
      tokenManager.verifyAccessToken.mockResolvedValue({ userId: 'user-123' });
      prisma.user.findUnique.mockResolvedValue(mockUser);

      await authenticate(req, res, next);

      expect(tokenManager.verifyAccessToken).toHaveBeenCalledWith('valid-token');
      expect(req.user).toEqual(mockUser);
      expect(next).toHaveBeenCalled();
    });

    it('should authenticate valid token from cookie', async () => {
      const mockUser = { id: 'user-123', email: 'test@example.com', role: 'USER' };
      req.cookies.token = 'valid-token';
      
      tokenManager.verifyAccessToken.mockResolvedValue({ userId: 'user-123' });
      prisma.user.findUnique.mockResolvedValue(mockUser);

      await authenticate(req, res, next);

      expect(tokenManager.verifyAccessToken).toHaveBeenCalledWith('valid-token');
      expect(req.user).toEqual(mockUser);
      expect(next).toHaveBeenCalled();
    });

    it('should reject request without token', async () => {
      await authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Authentication required'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should reject invalid token', async () => {
      req.headers.authorization = 'Bearer invalid-token';
      tokenManager.verifyAccessToken.mockRejectedValue(new Error('Invalid token'));

      await authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid token'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should reject revoked token', async () => {
      req.headers.authorization = 'Bearer revoked-token';
      tokenManager.verifyAccessToken.mockResolvedValue(null); // Returns null for revoked tokens

      await authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid or revoked token'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should reject token for deleted user', async () => {
      req.headers.authorization = 'Bearer valid-token';
      tokenManager.verifyAccessToken.mockResolvedValue({ userId: 'user-123' });
      prisma.user.findUnique.mockResolvedValue(null); // User not found

      await authenticate(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User not found'
      });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('authorize middleware', () => {
    it('should allow user with correct role', () => {
      req.user = { id: 'user-123', role: 'ADMIN' };
      const authorizeAdmin = authorize('ADMIN');

      authorizeAdmin(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should allow user with any of multiple allowed roles', () => {
      req.user = { id: 'user-123', role: 'MANAGER' };
      const authorizeMultiple = authorize('ADMIN', 'MANAGER');

      authorizeMultiple(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should reject user without required role', () => {
      req.user = { id: 'user-123', role: 'USER' };
      const authorizeAdmin = authorize('ADMIN');

      authorizeAdmin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      });
      expect(next).not.toHaveBeenCalled();
    });

    it('should reject request without user object', () => {
      const authorizeAdmin = authorize('ADMIN');

      authorizeAdmin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Authentication required'
      });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
