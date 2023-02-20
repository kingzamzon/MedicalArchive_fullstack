const address={
    4002: {
        name: "fantomTestnet",
        address: "0x92134fF22E609B9A630e9f2528cF3D9E7bc210d3",
        url: "https://testnet.ftmscan.com/address/0x92134fF22E609B9A630e9f2528cF3D9E7bc210d3#code",
    },
	3141: {
        name: "Hyperspace_fvm",
        address: "0xF281Afb262bA65fbD9d4BCfb2539aF1D064231ca",
        url: "https://hyperspace.filfox.info/en/address/0xF281Afb262bA65fbD9d4BCfb2539aF1D064231ca",
    }
}

const abi= [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_patientName",
				"type": "string"
			}
		],
		"name": "addPatient",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_cid",
				"type": "string"
			}
		],
		"name": "addRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "MedArchive__isNotYourPatient",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "hospitalAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "patientId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "recordId",
				"type": "uint256"
			}
		],
		"name": "NewRecord",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "hospitalAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "patientId",
				"type": "uint256"
			}
		],
		"name": "PatientAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "hospitalAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "patientId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "recordId",
				"type": "uint256"
			}
		],
		"name": "PatientShared",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_recordId",
				"type": "uint256"
			}
		],
		"name": "sharePatientsRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			}
		],
		"name": "getPatient",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "patientId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "patientName",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "hospitalAddr",
						"type": "address"
					}
				],
				"internalType": "struct MedArchive.Patient",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_recordId",
				"type": "uint256"
			}
		],
		"name": "getPatientRecord",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "cid",
						"type": "string"
					}
				],
				"internalType": "struct MedArchive.PatientRecord",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_patientId",
				"type": "uint256"
			}
		],
		"name": "getPatientRecords",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "cid",
						"type": "string"
					}
				],
				"internalType": "struct MedArchive.PatientRecord[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSharedRecords",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "cid",
						"type": "string"
					}
				],
				"internalType": "struct MedArchive.PatientRecord[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s_owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]