# StarkAccess 🎫

![Frame 1321314818](https://github.com/user-attachments/assets/ea06274f-b42d-40a3-a98c-1fa64b52a444)



StarkAccess is a decentralized event management and ticketing platform powered by Starknet and zkSNARKs. It allows users to purchase event tickets as NFTs on-chain, ensuring privacy, security, and transparency. Organizers can create events, add co-organizers, and manage ticket sales, while maintaining a high level of privacy for all participants through zero-knowledge proofs.

## Key Features

### For Users
- ✅ Purchase event tickets as NFTs using Starknet
- ✅ Enjoy low gas fees and seamless on-chain transactions
- ✅ Tickets are privacy-preserving, leveraging zkSNARKs for secure and verifiable ownership
- ✅ Easily check in at events with organizer verification

### For Organizers
- ⭐ Create and manage events with decentralized ticketing
- ⭐ Add co-organizers to help with event management
- ⭐ Generate revenue by selling tickets as NFTs on-chain
- ⭐ Prevent organizers from purchasing their own event tickets
- ⭐ Check-in attendees

### For Admins and Super Admins
- 🛠️ Admins can oversee users, events, and tickets, with the ability to suspend or ban them if necessary
- 🛠️ Super Admins have full platform control, including adding new admins and managing their permissions

## 🔨 How was it made?

The platform leverages the power of Starknet's Layer 2 scaling and zkSNARKs for privacy-preserving transactions. Tickets are issued as NFTs through Cairo contracts and paid in Starknet tokens. The dApp frontend is built using Next.js and integrates Argent X for wallet interactions, and Zero-Knowledge Proofs.

## ⚙️ Technologies

- **Starknet**: L2 scalability for Ethereum with low fees
- **Cairo Contracts**: Smart contracts to manage event ticketing
- **zkSNARKs**: Zero-knowledge proofs for secure ticket issuance and validation
- **Argent X**: Wallet integration for Starknet payments

## 🛠️ Build and Deploy

### Frontend (Next.js)

1. Clone the repository:

    ```bash
    git clone https://github.com/Starknet-Event-Ticketing-Platform
    ```

2. Navigate to the frontend folder and install dependencies:

    ```bash
    cd frontend
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

4. Build for production:

    ```bash
    npm run build
    ```


### Backend (Node.js)

1. Navigate to the backend folder and install dependencies:

    ```bash
    cd backend
    npm install
    ```

2. Set up your environment variables (e.g., `.env` file) for database and Starknet integration.

3. Run the backend development server:

    ```bash
    npm run dev
    ```

4. Build the server for production:

    ```bash
    npm run build
    ```

## 🧑‍💻 Todos

- [ ] User onboarding
- [ ] User role assignment
- [ ] Add event creation
- [ ] Implement ticket purchasing
- [ ] Add staking logic for ticket reservations
- [ ] Check-in functionality for organizers
- [ ] Support for ERC721 or Soulbound tokens for tickets
- [ ] Add testing for Cairo contracts
- [ ] Implement tipping feature for event support

## LICENSE

[MIT](https://opensource.org/license/mit/)
