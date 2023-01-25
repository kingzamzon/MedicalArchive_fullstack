from flask import Flask, request, abort, jsonify
from flask_cors import CORS
from cryptography.fernet import Fernet
import os


def create_app(test_config=None):
    app=Flask(__name__)
    CORS(app)

    KEY= os.getenv("FERNET_KEY")
    f=Fernet(bytes(KEY,'utf-8'))

    @app.after_request
    def after_request(response):
        response.headers.add(
            "Access-Control-Allow-Headers", "Content-Type,Authorization,true"
        )
        response.headers.add(
            "Access-Control-Allow-Methods", "GET"
        )
        response.headers.add(
            "Access-Control-Allow-Origin", "*"
        )
        return response
    
    def decrypt(data):
        result= bytes(data,'utf-8')
        return f.decrypt(result).decode()

    @app.route("/encode",methods=["GET"])
    def encrypt_data():
        data=request.get_json()

        cid=data.get("cid")
        return jsonify({
            "status":200,
            "success":True,
            "hash":f.encrypt(cid.encode())
        }),200

    @app.route("/decode",methods=["GET"])
    def decrypt_data():
        data=request.get_json()
        cids= data.get_list("cids").split(",")
        hashes=map(decrypt, cids)
        return jsonify({
            "status":200,
            "success":True,
            "cids":hashes
        }),200

    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({
            "status": 405,
            "message": "Method is not allowed",
            "success": False
        }), 405

    @app.errorhandler(422)
    def cant_process(error):
        return jsonify({
            "status": 422,
            "success": False,
            "message": "Request unprocessable"
        }), 422

    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            "status": 400,
            "success": False,
            "message": "Bad Request"
            
        }), 400

    @app.errorhandler(500)
    def server_error(error):
        return jsonify({
            "status": 500,
            "success": False,
            "message": "Internal server error"
        }), 500

    return app

