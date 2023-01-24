//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

error MedArchive__isNotYourPatient();

contract MedArchive {
    address public s_owner;

    struct PatientRecord {
        uint256 id;
        uint256 date;
        string description;
        string cid;
    }

    struct Patient {
        uint256 patientId;
        string patientName;
        address hospitalAddr;
    }

    mapping(address => uint256) private s_patientIds;
    mapping(address => mapping(uint256 => Patient)) private s_hospitalPatients;
    mapping(address => mapping(uint256 => PatientRecord[])) private s_hospitalRecords;
    mapping(address => PatientRecord[]) private s_sharedRecords;

    event PatientAdded(address indexed hospitalAddress, uint256 patientId);
    event NewRecord(address indexed hospitalAddress, uint256 indexed patientId, uint256 recordId);
    event PatientShared(
        address indexed hospitalAddress,
        uint256 indexed patientId,
        uint256 recordId
    );

    modifier isYourPatient(uint256 _patientId) {
        // only authorized address can alter patient record
        if (s_hospitalPatients[msg.sender][_patientId].hospitalAddr != msg.sender) {
            revert MedArchive__isNotYourPatient();
        }
        _;
    }

    constructor() {
        s_owner = msg.sender;
    }

    function addPatient(string calldata _patientName) external {
        uint256 id = s_patientIds[msg.sender] += 1;
        s_hospitalPatients[msg.sender][id] = Patient({
            patientId: id,
            patientName: _patientName,
            hospitalAddr: msg.sender
        });
        emit PatientAdded(msg.sender, id);
    }

    function addRecord(
        uint256 _patientId,
        string calldata _description,
        string calldata _cid
    ) external isYourPatient(_patientId) {
        // isYourPatient Modifier already takes care of if patient does not exist
        uint256 recordId = s_hospitalRecords[msg.sender][_patientId].length;
        s_hospitalRecords[msg.sender][_patientId].push(
            PatientRecord({
                id: recordId,
                date: block.timestamp,
                description: _description,
                cid: _cid
            })
        );
        emit NewRecord(msg.sender, _patientId, recordId);
    }

    function sharePatientsRecord(
        address _to,
        uint256 _patientId,
        uint256 _recordId
    ) external isYourPatient(_patientId) {
        s_sharedRecords[_to].push(s_hospitalRecords[msg.sender][_patientId][_recordId]);
        emit PatientShared(msg.sender, _patientId, _recordId);
    }

    function getPatientRecords(uint256 _patientId) external view returns (PatientRecord[] memory) {
        return s_hospitalRecords[msg.sender][_patientId];
    }

    function getPatientRecord(
        uint256 _patientId,
        uint256 _recordId
    ) external view returns (PatientRecord memory) {
        return s_hospitalRecords[msg.sender][_patientId][_recordId];
    }

    function getPatient(uint256 _patientId) external view returns (Patient memory) {
        return s_hospitalPatients[msg.sender][_patientId];
    }

    function getSharedRecords() external view returns (PatientRecord[] memory) {
        return s_sharedRecords[msg.sender];
    }
}
