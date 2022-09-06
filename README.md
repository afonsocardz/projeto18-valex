# Usage guide to Valex API
# /cards Routes

### GET /cards/balance/:id
Get card's balance, transactions and recharges logs.

 - ID of the card registered in database
 - Needs to be a number

### POST /cards/create
Create a new card.

 - **API key required**
```json
//Body
{
  "employeeId": 1,
  "type": "education"
}
```
```json
//Headers
{
  "x-api-key": "YOUR_API_KEY",
}
```
### PUT /cards/activate
Activate a new card with password.

 - **CVC required**
```json
//Body
{
  "id":4,
  "securityCode":"666",
  "password":"1234"
}
```
### PUT /cards/block & /cards/unblock
Block or unblock cards.

 - **Password required**
```json
//Body
{
  "id":4,
  "password":"1234"
}
```
# /payments Routes
## POST /payments
Pay something with the card.
- Card type need to be the same of business
- Need to have sufficient amount to pay
```json
{
  "payment": {
    "businessId": 1,
    "cardId": 4,
    "amount": 400
  },
  "password": "1234"
}
```
# /recharges Routes
## POST /recharges
Recharge a card.

 - **API key required**
```json
//Body
{
  "amount": 500,
  "cardId": 4
}
```
```json
//Headers
{
  "x-api-key": "YOUR_API_KEY",
}
```
