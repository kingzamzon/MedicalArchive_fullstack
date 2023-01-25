import os
import unittest
import json
from securor import create_app


class SecurorTestCase(unittest.TestCase):
    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client

    def tearDown(self):
        """Executed after reach test"""
        pass

    def test_encode(self):
        """should return a valid hash in string"""
        res = self.client().get(
            "/encode",
            json={
                "cid": "vgcwhjcjdw jenywdvcjwe76325767hou3bdtfi3db",
                "password": "test",
            },
        )
        data = json.loads(res.data)
        self.assertTrue(isinstance(data["hash"], str))
        self.assertTrue(res.status_code == 200)

    def test_decode(self):
        """should return same cid or data in string"""
        res = self.client().get(
            "/encode",
            json={
                "cid": "vgcwhjcjdw jenywdvcjwe76325767hou3bdtfi3db",
                "password": "test",
            },
        )
        data = json.loads(res.data)["hash"]
        res = self.client().get(
            "/decode",
            json={"cids": [data], "password": "test"},
        )
        data = json.loads(res.data)["cids"]
        self.assertEqual(data[0], "vgcwhjcjdw jenywdvcjwe76325767hou3bdtfi3db")
        self.assertTrue(isinstance(data[0], str) and isinstance(data, list))

    def test_not_give_correct_cid_with_wrong_password(self):
        "if wrong or different password is given you should not get same cid"
        res = self.client().get(
            "/encode",
            json={
                "cid": "vgcwhjcjdw jenywdvcjwe76325767hou3bdtfi3db",
                "password": "test",
            },
        )
        data = json.loads(res.data)["hash"]
        res = self.client().get(
            "/decode",
            json={"cids": [data], "password": "wrong password"},
        )
        data = json.loads(res.data)
        self.assertTrue(res.status_code == 403)
        self.assertFalse(data["success"])


# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()
