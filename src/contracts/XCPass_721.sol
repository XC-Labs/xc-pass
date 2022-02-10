// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract XCPass is ERC721Enumerable, Ownable {
  using Strings for uint256;

  string public baseURI;
  string public baseExtension = ".json";
  uint256 public cost = 1 ether;
  uint256 public maxSupply = 7777;
  uint256 public maxMintAmount = 50;
  uint256 private ownerMintedLimit = 1777;
  address private payoutAddress = 0x6458a79Eb4EF3F6982FF4Fe270F43fD6ec9F30c1;
  uint256 public whitelistTotal = 0;
  bool public whitelistSale = false;
  bool public whitelistRegistrationActive = false;
  bool public paused = false;
  mapping(address => bool) public whitelisted;

  //Constructor del contrato
  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
  }

  //Funcion que devuelve la base URI actual
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  //Funcion para Mintear un token
  function mint(address _to, uint256 _mintAmount) public payable {
    uint256 supply = totalSupply();
    //La venta no esta activa
    require(!paused, "Sale is not active at the moment.");
    //No se puede mintear menos de 1
    require(_mintAmount > 0, "The minimum minting amount is 1.");
    //No se puede mintear mas del maxMintAmount
    require(_mintAmount <= maxMintAmount, "The maximum minting amount is 50.");
    //No se puede tener mas del maxMintAmount en la wallet
    require(_mintAmount + balanceOf(msg.sender) <= maxMintAmount, "You cant have more than 50 NFTs in your wallet.");
    //No se puede mintear si no quedan suficientes NFTs
    require(supply + _mintAmount <= maxSupply, "There are not enough NFTs left.");

    //Si es el dueño del contrato se salta las validaciones
    if (msg.sender != owner()) {
      //Si no es dueño del contrato se valida si esta la whitelist activa
      if (whitelistSale == true) {
          //Si la whitelist esta activa se valida si esta en ella
          require(whitelisted[msg.sender] == true, "Your address is not whitelisted.");
      }
      //Si el usuario esta en la whitelist o la whitelist no esta activa, se valida el monto de la transaccion
      require(msg.value >= cost * _mintAmount, "The value sent is not enough.");
    }
    //Si se envio el monto correcto se mintean los NFTs
    for (uint256 i = 1; i <= _mintAmount; i++) {
      _safeMint(_to, supply + i);
    }
  }

  //Funcion para minteo inicial del Owner
  function mintToOwner(uint256 _mintAmount) public onlyOwner {
    uint256 amountOwned = balanceOf(payoutAddress);
    //No se puede mintear mas del limite
    require(amountOwned <= ownerMintedLimit, "You already own 1777 tokens.");
    require(amountOwned + _mintAmount <= ownerMintedLimit, "Owneer cannot mint more than 1777 tokens in total.");
    uint256 supply = totalSupply();
    //No se puede mintear si no quedan suficientes NFTs
    require(supply + _mintAmount <= maxSupply, "There are not enough NFTs left.");
    for (uint256 i = 1; i <= _mintAmount; i++) {
      _safeMint(payoutAddress, supply + i);
    }
  }

  //Funcion que devuelve los token ids del wallet del owner
  function walletOfOwner(address _owner)
    public
    view
    returns (uint256[] memory)
  {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
    }
    return tokenIds;
  }

  //Funcion que devuelve el URI de un token
  function tokenURI(uint256 tokenId)
    public
    view
    virtual
    override
    returns (string memory)
  {
    require(
      _exists(tokenId),
      "ERC721Metadata: URI query for nonexistent token"
    );

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
  }

  //Funcion para cambiar el precio de venta
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
  }

  //Funcion para definir el maximo numero de minteos por wallet
  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
  }

  //Funcion para cambiar la URI base del asset asociado al token
  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
  }

  //Funcion para cambiar la extension del asset asociado al token
  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
  }

  //Funcion para activar/desactivar la venta general
  function pause() public onlyOwner {
    paused = !paused;
  }
  
  //Funcion para activar/desactivar la venta con whitelist
  function toggleWhitelistSale() public onlyOwner {
    whitelistSale = !whitelistSale;
  }

  //Funcion para activar/desactivar el registro al whitelist
  function toggleWhitelistRegistration() public onlyOwner {
    whitelistRegistrationActive = !whitelistRegistrationActive;
  }

  //Evento para cambios en el whitelist
  event userWasWhitelisted(address indexed whitelistedUser, string status);
 
  //Function para agregar una direccion al whitelist
  function whitelistUser(address _user) public {
   require(whitelistRegistrationActive == true, "Whitelist registration is not active.");
   if(whitelistRegistrationActive == true){
    whitelisted[_user] = true;
    whitelistTotal++;
    emit userWasWhitelisted(_user, "Added");
   }
  }

  //Funcion para remover una direccion del whitelist
  function removeWhitelistUser(address _user) public onlyOwner {
    whitelisted[_user] = false;
    whitelistTotal--;
    emit userWasWhitelisted(_user, "Removed");
  }

  //Funcion para retirar fondos del contrato
  function withdraw() public payable onlyOwner {   
    // This will payout the contract balance to the contract owner.
    // =============================================================================
    (bool os, ) = payable(payoutAddress).call{value: address(this).balance}("");
    require(os);
    // =============================================================================
  }
}