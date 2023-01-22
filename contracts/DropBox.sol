//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Dropbox {


    address private s_owner;

    struct FolderItem {
        uint256 id;
        string name;
        string description;
        string Cid;
    }

    struct Folder {
        uint256 id;
        string name;
        FolderItem[] items;
    }
    constructor() {
        s_owner=msg.sender;
    }
}