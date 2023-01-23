//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract MedArchive {


    address private s_owner;


    // struct FolderRecord {
    //     uint256 id;
    //     uint256 date;
    //     string description;
    //     string Cid;
    // }

    struct Folder {
        uint256 patientId;
        string patientName;
        string[] recordsCid;
    }

    mapping (address => uint256) private s_customerIds;
    mapping (address =>mapping (uint256 => Folder[])) private s_hospitalRecords;

    event PatientAdded(address indexed hospitalAddress,uint256 id);

    constructor() {
        s_owner=msg.sender;
    }

    function addPatient(string calldata _patientName) external {
        uint256 id= s_customerIds[msg.sender]+=1;
        s_hospitalRecords[msg.sender][id].push(Folder({
            patientId:id,
            patientName:_patientName,
            recordsCid:new string[](0)
            }));
        emit PatientAdded(msg.sender,id);
    }
}