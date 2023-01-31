from flask import Flask, request, abort, jsonify
from flask_cors import CORS
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import os
import base64


def create_app(test_config=None):
    app = Flask(__name__)
    CORS(app)

    def kdf():
        return PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=bytes(os.getenv("FERNET_KEY"), "utf-8"),
            iterations=480000,
        )

    def get_key(password):
        return base64.urlsafe_b64encode(kdf().derive(bytes(password, "utf-8")))

    def decrypt(data, password):
        try:
            result = bytes(data, "utf-8")
            return Fernet(get_key(password)).decrypt(result).decode()
        except Exception as e:
            abort(403)

    # @app.after_request
    # def after_request(response):
    #     response.headers.add(
    #         "Access-Control-Allow-Headers", "Content-Type,Authorization,true"
    #     )
    #     response.headers.add("Access-Control-Allow-Methods", "GET")
    #     response.headers.add("Access-Control-Allow-Origin", request.headers['Origin'])
    #     return response

    @app.route("/encode", methods=["GET","POST"])
    def encrypt_data():
        data = request.get_json()
        cid = data.get("cid")
        password = data.get("password")
        return (
            jsonify(
                {
                    "status": 200,
                    "success": True,
                    "hash": Fernet(get_key(password)).encrypt(cid.encode()).decode(),
                }
            ),
            200,
        )

    @app.route("/decode", methods=["GET","POST"])
    def decrypt_data():
        data = request.get_json()
        cids = data["cids"]
        password = data["password"]
        hashes = map(lambda ids: decrypt(ids, password=password), cids)
        return jsonify(
            {
                "status": 200, 
                "success": True, 
                "cids": list(hashes)
            }
        ), 200

    @app.errorhandler(403)
    def method_not_allowed(error):
        return (jsonify(
            {
                "status": 403, 
                "message": "Forbidden", 
                "success": False
            }), 403)

    @app.errorhandler(405)
    def method_not_allowed(error):
        return (
            jsonify(
                {
                    "status": 405, 
                    "message": "Method is not allowed", 
                    "success": False
                }
            ),
            405,
        )

    @app.errorhandler(422)
    def cant_process(error):
        return (
            jsonify(
                {
                    "status": 422, 
                    "success": False, 
                    "message": "Request unprocessable"
                }
            ),
            422,
        )

    @app.errorhandler(400)
    def bad_request(error):
        print(error)
        return jsonify(
            {
                "status": 400, 
                "success": False, 
                "message": "Bad Request"
            }), 400

    @app.errorhandler(500)
    def server_error(error):
        return (
            jsonify(
                {
                    "status": 500, 
                    "success": False, "message": 
                    "Internal server error"
                }
            ),
            500,
        )

    return app
