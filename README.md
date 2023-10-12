# Free Shopping Backend

This is the back-end for my Fullstack project "Free Shopping"

## ENDPOINTS

### Public Methods <br/>
#### Products
GET /products -> Get all products <br/>
GET /products/:id -> Get the product with matching Id<br/>
#### Brands
GET /brands -> Get all brands <br/>
GET /brands/:id -> Get the brand with matching Id<br/>
#### Auth
POST /auth/login -> Log in with your account. Data structure: <br/>
```bash
{
	"username" : "dera", // String
	"password": "bruhmium" // String
}
```
POST /auth/signup -> Create your account. Data structure: <br/>
```bash
{
	"username" : "dera", // String
	"password": "bruhmium", // String
	"matchingPassword": "bruhmium" // String
}
```
### Protected Methods<br/>
#### Products
POST /products -> Create a product. Data structure: (all required)<br/>

```bash
{
	"name" : "Discrepancy", // String
	"description": "Makes you confused about two conflicting facts", // String
	"price": 1500, // Number
	"image_url": "https://pics.freeicons.io/uploads/icons/png/15442581531684167749-512.png", // String
	"brand_id": 2 // Number
}
```

PUT /products -> Update a product. Data structure:<br/>

```bash
{
	"id": 3, // Number, required
	"name" : "Discrepancy", // String, optional
	"description": "Makes you confused about two conflicting facts", // String, optional
	"price": 1500, // Number, optional
	"image_url": "https://pics.freeicons.io/uploads/icons/png/15442581531684167749-512.png", // String, optional
	"brand_id": 2 // Number, optional
}
```
DELETE /products -> Delete a product. Data structure:<br/>

```bash
{
	"id": 3, // Number, required
}
```
#### Brands
POST /brands -> Create a brand. Data structure: (all required)<br/>

```bash
{
	"name" : "Singing Spirits", // String
	"logo_url": "https://pics.freeicons.io/uploads/icons/png/5639170651695535536-512.png", // String
}
```

PUT /brands -> Update a brand. Data structure:<br/>

```bash
{
	"id": 3, // Number, required
	"name" : "Singing Spirits", // String, optional
	"logo_url": "https://pics.freeicons.io/uploads/icons/png/5639170651695535536-512.png", // String, optional
}
```
DELETE /brands -> Delete a brand. Data structure:<br/>

```bash
{
	"id": 3, // Number, required
}
```
### Populating the Database

Included in the repo is the file Insomnia_Requests_To_Populate. You may have to run these requests on Insomnia to populate the database with brands and products.<br/>
This is especially necessary when hosting on Render, on which the free plan resets all files on deploy or inactivity.
To do so you need an access token. You can get this after logging in in your browser from the cookie access_token.<br/>
Then you need to add your token to the Authorization header of the requests, otherwise the server will reject your petition.<br/>
The header should look like this:<br/>
```bash
Authorization: Bearer [your-access-token]
```
You will also need to add the brands BEFORE the products. Otherwise ther will be an error, as every product is required to have a brand.

### Environmental Variables

There is only one Env Variable:

JWT_SECRET=(your_secret_here)

Store it in .env at the root of the project.