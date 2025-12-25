export const TECHNICAL_DOCS = [
  {
    id: 1,
    title: "React Component",
    category: "Frontend",
    text: `const Button = ({ onClick, children, variant }) => {
  return (
    <button onClick={onClick} className={variant}>
      {children}
    </button>
  );
};
export default Button;`,
    estimatedTime: 4
  },
  {
    id:  2,
    title: "Python Function",
    category:  "Backend",
    text: `def calculate_fibonacci(n):
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    fib = [0, 1]
    for i in range(2, n):
        fib.append(fib[i-1] + fib[i-2])
    return fib`,
    estimatedTime: 5
  },
  {
    id:  3,
    title: "REST API Endpoint",
    category: "API",
    text:  `POST /api/v1/users/authenticate
Content-Type: application/json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
Response: { "token": "jwt_token_here" }`,
    estimatedTime: 5
  },
  {
    id:  4,
    title: "SQL Query",
    category: "Database",
    text: `SELECT u.user_id, u.username,
       COUNT(o.order_id) as total_orders
FROM users u
LEFT JOIN orders o ON u.user_id = o.user_id
WHERE u.status = 'active'
GROUP BY u.user_id
ORDER BY total_orders DESC;`,
    estimatedTime: 5
  },
  {
    id:  5,
    title: "Docker Configuration",
    category:  "DevOps",
    text: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]`,
    estimatedTime: 4
  },
  {
    id:  6,
    title: "Git Commands",
    category:  "Version Control",
    text: `git clone https://github.com/user/repo.git
git checkout -b feature/new-feature
git add . 
git commit -m "Add new feature"
git push origin feature/new-feature
git merge main`,
    estimatedTime: 5
  },
  {
    id: 7,
    title: "TypeScript Interface",
    category: "Frontend",
    text: `interface User {
  id: string;
  username:  string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
}
type UserRole = 'admin' | 'user';`,
    estimatedTime: 5
  },
  {
    id:  8,
    title: "AWS Lambda Function",
    category: "Cloud",
    text:  `exports.handler = async (event) => {
  const { httpMethod, body } = event;
  if (httpMethod !== 'POST') {
    return { statusCode: 405 };
  }
  const data = JSON.parse(body);
  return { statusCode: 200, body: JSON.stringify(data) };
};`,
    estimatedTime: 6
  }
];
