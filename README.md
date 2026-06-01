## Project Setup

### Clone Repository

git clone <repository-url>

### Install Dependencies

npm install

### Environment Configuration

Create a `.env` file in the project root and add the required environment variables.

Example:

BASE_URL=https://application-url.com
USERNAME=<username>
PASSWORD=<password>

### Credentials

Credentials are not stored in the repository.

Please obtain the latest credentials from:

- Company Vault (HashiCorp Vault, Azure Key Vault, AWS Secrets Manager, etc.)
- Secure Confluence Page
- Password Management Tool
- Project Administrator

### Run Tests

npx playwright test

### Run Tests in Headed Mode

npx playwright test --headed
