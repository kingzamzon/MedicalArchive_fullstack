//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract MedArchive {


    address private s_owner;


    struct PatientRecord {
        uint256 id;
        uint256 date;
        string description;
        string Cid;
    }

    struct Patient {
        uint256 patientId;
        string patientName;
       
    }

    mapping (address => uint256) private s_patientIds;
    mapping (address =>mapping (uint256 => Patient[])) private s_hospitalPatients;
    mapping (address =>mapping (uint256 => PatientRecord[])) private s_hospitalRecords;

    event PatientAdded(address indexed hospitalAddress,uint256 id);

    constructor() {
        s_owner=msg.sender;
    }

    function addPatient(string calldata _patientName) external {
        uint256 id= s_patientIds[msg.sender]+=1;
        s_hospitalPatients[msg.sender][id].push(Patient({
            patientId:id,
            patientName:_patientName
            }));
        emit PatientAdded(msg.sender,id);
    }
}