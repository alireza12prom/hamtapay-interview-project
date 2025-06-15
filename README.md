<h1 align="center"> ⚠️ توجه ⚠️</h1>

<p align="center">
با اینکه برای انجام این پروژه چهار روز فرصت داده شده بود، متأسفانه به دلیل مشغله‌های شخصی و محدودیت زمانی، موفق شدم تنها <b> حدود ۶ ساعت</b> برای این پروژه وقت بگذارم. بابت این موضوع صمیمانه عذرخواهی می‌کنم.
به همین دلیل، پیاده‌سازی بخش Notification Service انجام نشده و باقی مانده است. در صورت در اختیار داشتن زمان بیشتر، حتماً این بخش را نیز تکمیل و به همراه تست‌های مربوطه ارائه می‌دادم.
</p>

<br>

# HamtaPay Microservices

HamtaPay Microservices is a distributed system composed of several independent services designed for handling market data, order management, and pricing logic. Each service is built with [NestJS](https://nestjs.com/) and communicates via HTTP APIs. The project is structured for scalability, maintainability, and ease of deployment using Docker.


> **Note:** For fetching the gold price, the project uses the [brsapi.ir](https://brsapi.ir/) webservice.

## Project Structure

```
hamtapay-microservices/ 
  ├── initdb/
  ├── market-data-service/ 
  ├── order-service/ 
  ├── pricing-service/
  ├── docker-compose.yml
  └── README.md
```

## Services Overview

- **Market Data Service**: Fetches and updates market data (e.g., gold prices), exposes endpoints for other services.
- **Order Service**: Manages inventory and order placement, persists data in PostgreSQL.
- **Pricing Service**: Calculates prices using data from other services and custom rules.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)
- Node.js (for local development, optional)

### 1. Clone the Repository

```sh
git clone https://github.com/your-org/hamtapay-microservices.git
cd hamtapay-microservices
```

### 2. Configure Environment Variables
Each service has a .env.example file. Copy it to .env and adjust as needed:

```sh
cp [.env.example](http://_vscodecontentref_/2) [.env](http://_vscodecontentref_/3)
cp [.env.example](http://_vscodecontentref_/4) [.env](http://_vscodecontentref_/5)
cp [.env.example](http://_vscodecontentref_/6) [.env](http://_vscodecontentref_/7)
```

Edit the .env files to match your local setup if necessary.

### 3. Start the Services
Use Docker Compose to build and run all services and dependencies (e.g., PostgreSQL, Redis):

```sh
docker-compose up --build
```

This will start all microservices and required infrastructure.

### 4. Accessing the APIs
- Order Service: http://localhost:8001/v1/order
- Pricing Service: http://localhost:8000/v1/pricing
- Market Data Service: http://localhost:8002/v1/market-data/gold