// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.5.0 <0.9.0;

contract ImageHash {
    mapping(string => bool) private imageHashes;
    event HashStored(string hash);

    function storeImageHash(
        string memory _hash,
        string memory _rollNumber,
        string memory _name
    ) public {
        if (imageHashes[_hash]) {
            string memory errorMsg = string(
                abi.encodePacked(
                    "Duplicate image hash: ",
                    _hash,
                    ", Roll Number: ",
                    _rollNumber,
                    ", Name: ",
                    _name
                )
            );
            emit Error(errorMsg, _hash);
            revert(errorMsg);
        } else {
            imageHashes[_hash] = true;
            emit HashStored(_hash, _rollNumber, _name);
        }
    }

    event HashStored(string hash, string rollNumber, string name);
    event Error(string message, string hash);
}
