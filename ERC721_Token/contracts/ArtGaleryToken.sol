pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol';
import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol';

contract ArtGallery is ERC721Full, ERC721Mintable {
  constructor(string memory _name, string memory _symbol) 
    ERC721Full(_name, _symbol) public {}
}

/*

structure openzeppelin contracts

ERC721Full
  import "./ERC721.sol";
  import "./ERC721Enumerable.sol";
  import "./ERC721Metadata.sol"; 

  ERC721.sol
    import "./IERC721.sol";
    import "./IERC721Receiver.sol";
    import "../../math/SafeMath.sol";
    import "../../utils/Address.sol";
    import "../../introspection/ERC165.sol"

  ERC721Enumerable.sol
    import "./IERC721Enumerable.sol";
    import "./ERC721.sol";
    import "../../introspection/ERC165.sol";

  ERC721Metadata.sol
    import "./ERC721.sol";
    import "./IERC721Metadata.sol";
    import "../../introspection/ERC165.sol";

ERC721Mintable
  import "./ERC721.sol";
  import "../../access/roles/MinterRole.sol";

*/
