//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract MedArchive {


    address private s_owner;

    struct FolderRecord {
        uint256 id;
        uint256 date;
        string description;
        string Cid;
    }

    struct Folder {
        uint256 PatientId;
        string PatientName;
        FolderRecord[] records;
    }
    constructor() {
        s_owner=msg.sender;
    }
}