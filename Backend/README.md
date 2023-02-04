# Backend - Fi-Cave API

> ## Table of Contents
- [FI-CAVE API-ENDPOINT DOCUMENTATION](#fi-cave-api-endpoint-documentation)
    - [Base Uri](#base-uri)
    - [Error Handling](#error-handling)
    - [EndPoints](#endpoints)
- [Setting up the Backend](#setting-up-the-backend)
    - [Install Dependencies](#install-dependencies)
    - [Run the Server](#run-the-server)
- [Testing](#testing)
- [Authors](#authors)

## Setting up the Backend

### Install Dependencies

1. **Python 3.7** - Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

2. **Virtual Environment** - We recommend working within a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organized. Instructions for setting up a virual environment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

3. **PIP Dependencies** - Once your virtual environment is setup and running, install the required dependencies by navigating to the `/Backend` directory and running:

```bash
pip install -r requirements.txt

```

#### Key Pip Dependencies

- [Flask](http://flask.pocoo.org/) is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [Flask-RESTful](https://www.sqlalchemy.org/) is the Python.

- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension we'll use to handle cross-origin requests from our frontend server.

- [cryptography](https://flask-cors.readthedocs.io/en/latest/#) is the library from which we import the Fernet cryptography library.


### Run the Server

From within the `./Backend` directory first ensure you are working using your created virtual environment.

To run the server, execute:
```bash
export FLASK_APP=securor
flask run --reload
```

The `--reload` flag will detect file changes and restart the server automatically.

<br>

## **FI-CAVE API-ENDPOINT DOCUMENTATION**
---
<br>

### **Base Uri**
----
----
The project has been deployed on [medarchive2.on.render.com](medarchive2.on.render.com). For Test or Development we will make use of on our local server or machine
- **Base Uri:** `localhost:5000` or `localhost:<prefered port>` or `http://127.0.0.1/5000`

<br>

### **Error Handling**
----
----
Errors are returned as JSON objects in the following formate

```python
{
  "status": 404,
  "success": False,
  "message": "resource not found"
}
```
The API will return 5 error types when requests fail
- 400: Bad Request
- 403: Forbidden
- 405: Method Not Allowed
- 422: Request Unprocessible
- 500: Internal server error
<br>


### **EndPoints**
----
----
<br>

 `POST '/encode'`
- encrypts the ipfs CID using Fernet and privided password based on arguements provided from JSON data, all arguements must be provided
- Request Arguements: JSON object containing 
```json
{
  "cid": "ipfs hash",
  "password": "your password",
} 
```
- Returns: `status`, `success`, `hash`
```json
{
  "status": 200,
  "success": true,
  "hash":"Fernet Hash..."
}
```

---

<br>

 `POST '/decode'`
- decrypts a list of fernet hashes using Fernet and privided password based on arguements provided from JSON data, all arguements must be provided
- Request Arguements: JSON object containing 
```json
{
  "cids": ["Fernet hash","FernetHash"],
  "password": "your password",
} 
```
- Returns: `status`, `success`, `cids`
```json
{
  "status": 200,
  "success": true,
  "cids":["ipfs hash","ipfs hash"]
}
```

---
<br>
<br>


## Testing
tests are found in th `./Backend/test_securor.py` file

To deploy the tests, run

```bash
python test_flaskr.py
```

## Authors
- @Godhanded