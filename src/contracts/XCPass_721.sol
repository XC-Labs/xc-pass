// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract XCPass is ERC721, ERC721Enumerable, Pausable, Ownable, ERC721Burnable {
  using Strings for uint256;
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;
  string public baseURI;
  string public baseExtension = ".json";
  uint256 public cost = 1 ether;
  uint256 public maxSupply = 7777;
  uint256 public maxMintAmount = 50;
  uint256 public ownerMinted = 0;
  uint256 private ownerMintLimit = 1777;
  address private payoutAddress = 0x2fc09613d640E34054f3f0D6e0e37ef36F569653;
  uint256 public amountBurned = 0;
  uint256 public whitelistTotal = 0;
  bool public whitelistSale = false;
  bool public whitelistRegistration = false;
  mapping(address => bool) public whitelisted;

  //Evento para registrar cada minteo
  event xcPassMinted(address indexed xcPassBuyer, uint256 xcPassesAmount);
  //Evento para registrar cada burn
  event xcPassBurned(address indexed xcPassBurner, uint256 xcPassID);
  //Evento para registrar cambios al contrato
  event configChanges(address indexed configChangedBy, string configChange);
  //Evento para cambios en el whitelist
  event userWasWhitelisted(address indexed whitelistedUser, string status);
  //Evento para registrar cambios al contrato
  event registerWithdrawal(address indexed withdrawRequester, address withdrawReceiver, uint256 withdrawAmount);

  //Constructor del contrato
  constructor(
    string memory _name,
    string memory _symbol,
    string memory _initBaseURI
  ) ERC721(_name, _symbol) {
    setBaseURI(_initBaseURI);
    _tokenIdCounter.increment();
  }

  //Funcion que devuelve la base URI actual
  function _baseURI() internal view virtual override returns (string memory) {
    return baseURI;
  }

  //Funcion para Mintear un token
  function mint(address _to, uint256 _mintAmount) public payable {
    uint256 supply = totalSupply();
    //La venta no esta activa
    require(!paused(), "Sale is not active at the moment.");
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
    }else{
      //Si es el dueño del contrato validamos que no tenga mas de 1777 tokens
      require(ownerMinted <= ownerMintLimit, "Owner already minted 1777 tokens.");
      require(ownerMinted + _mintAmount <= ownerMintLimit, "Owner cannot mint more than 1777 tokens in total.");
    }
    //Si se envio el monto correcto se mintean los NFTs
    for (uint256 i = 1; i <= _mintAmount; i++) {
      uint256 tokenId = _tokenIdCounter.current();
      _safeMint(_to, tokenId);
      _tokenIdCounter.increment();
    }
    //Se emite el evento para registrar la venta en BD
    emit xcPassMinted(_to, _mintAmount);
    if (msg.sender == owner()) {
        ownerMinted = ownerMinted + _mintAmount;
    }
  }

  //Funciones para quemar 1 pase
  function burn(uint256 tokenId) public override virtual {
    //solhint-disable-next-line max-line-length
    require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721Burnable: caller is not owner nor approved");
    _burn(tokenId);
    //Se reduce el max supply 
    setmaxSupply(maxSupply-1);
    //Incrementamos el numero de passes burned
    amountBurned = amountBurned + 1;
    //Se emite el evento para registrar la venta en BD
    emit xcPassBurned(msg.sender, tokenId);
  }

  //Funcion para quemar un grupo de pases
  function burnPasses(uint256[] memory ids) public {
    for (uint256 i = 0; i < ids.length; i++) {
        burn(ids[i]);
    }
  }

  //Funcion para Transferir varios pases
  function safeTransferBatch(uint256[] memory ids, address _to) public { 
    for (uint256 i = 0; i < ids.length; i++) {
          safeTransferFrom(msg.sender, _to, ids[i]);
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
        ? string(abi.encodePacked(currentBaseURI, "metadata", baseExtension))
        : "";
  }

  //Funcion para cambiar el precio de venta
  function setCost(uint256 _newCost) public onlyOwner {
    cost = _newCost;
    //Se emite el evento para el cambio
    emit configChanges(msg.sender, "Cost changed");
  }

  //Funcion para definir el maximo numero de minteos por wallet
  function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
    maxMintAmount = _newmaxMintAmount;
    //Se emite el evento para el cambio
    emit configChanges(msg.sender, "Max Mint Amount changed");
  }

  //Funcion para definir el supply maximo
  function setmaxSupply(uint256 _newmaxSupply) public onlyOwner {
    maxSupply = _newmaxSupply;
    //Se emite el evento para el cambio
    emit configChanges(msg.sender, "Max Supply changed");
  }

  //Funcion para cambiar la URI base del asset asociado al token
  function setBaseURI(string memory _newBaseURI) public onlyOwner {
    baseURI = _newBaseURI;
    //Se emite el evento para el cambio
    emit configChanges(msg.sender, "URI Changed");
  }

  //Funcion para cambiar la extension del asset asociado al token
  function setBaseExtension(string memory _newBaseExtension) public onlyOwner {
    baseExtension = _newBaseExtension;
    //Se emite el evento para el cambio
    emit configChanges(msg.sender, "Metadata BaseExtension Changed");
  }

  //Funcion para pausar todas las transacciones del contrato
  function pause() public onlyOwner {
      _pause();
      //Se emite el evento para el cambio
      emit configChanges(msg.sender, "Minting Paused");
  }

  //Funcion para resumir todas las transacciones del contrato
  function unpause() public onlyOwner {
      _unpause();
      //Se emite el evento para el cambio
      emit configChanges(msg.sender, "Minting Resumed");
  }
  
  //Funcion para activar/desactivar la venta con whitelist
  function toggleWhitelistSale() public onlyOwner {
    whitelistSale = !whitelistSale;
    //Se emite el evento para el cambio
    emit configChanges(msg.sender, "Whitelist Sale toggled");
  }

  //Funcion para activar/desactivar el registro al whitelist
  function toggleWhitelistRegistration() public onlyOwner {
    whitelistRegistration = !whitelistRegistration;
    //Se emite el evento para el cambio
    emit configChanges(msg.sender, "Whitelist Registration toggled");
  }
 
  //Function para agregar una direccion al whitelist
  function whitelistUser(address _user) public {
   require(whitelistRegistration == true, "Whitelist registration is not active.");
   if(whitelistRegistration == true){
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
    uint256 currentBalance = address(this).balance;
    // This will payout the contract balance to the contract owner.
    // =============================================================================
    (bool os, ) = payable(payoutAddress).call{value: address(this).balance}("");
    require(os);
    // =============================================================================
    emit registerWithdrawal(msg.sender, payoutAddress, currentBalance);
  }

  function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}