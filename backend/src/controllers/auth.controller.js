function createMockUser(email, name) {
  return {
    id: Date.now(),
    name: name || email.split('@')[0],
    email
  };
}

function validateAuthInput(email, password) {
  if (!email || !password) return 'Email and password are required';
  if (!email.includes('@')) return 'Please enter a valid email address';
  if (password.length < 4) return 'Password must be at least 4 characters';
  return null;
}

function login(req, res) {
  const { email, password } = req.body;
  const error = validateAuthInput(email, password);

  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    token: 'mock-jwt-token-12345',
    user: createMockUser(email)
  });
}

function register(req, res) {
  const { name, email, password } = req.body;
  const error = validateAuthInput(email, password);

  if (error) {
    return res.status(400).json({ success: false, message: error });
  }

  return res.status(201).json({
    success: true,
    message: 'Account created successfully',
    token: 'mock-jwt-token-67890',
    user: createMockUser(email, name)
  });
}

module.exports = { login, register };
