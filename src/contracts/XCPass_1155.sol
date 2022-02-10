// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract XCPass is ERC1155, Ownable, Pausable, ERC1155Burnable, ERC1155Supply {

    uint256 public constant XCPasses = 0;
    uint256 public cost = 1 ether;
    uint256 public maxSupply = 7777;
    uint256 public maxMintAmount = 50;
    uint256 private ownerMint = 1777;
    address private payoutAddress = 0x6458a79Eb4EF3F6982FF4Fe270F43fD6ec9F30c1;
    uint256 public whitelistTotal = 0;
    bool public whitelistSale = false;
    bool public whitelistRegistrationActive = false;
    mapping(address => bool) public whitelisted;

    constructor(string memory _initBaseURI) ERC1155(_initBaseURI) {
        _mint(payoutAddress, XCPasses, ownerMint, "");
    }
    
    //Funcion para Mintear un token
    function mint(address _to, uint256 _mintAmount) public payable {
        //La venta no esta activa
        require(!paused(), "Sale is not active at the moment.");
        //No se puede mintear menos de 1
        require(_mintAmount > 0, "The minimum minting amount is 1.");
        //No se puede mintear mas del maxMintAmount
        require(_mintAmount <= maxMintAmount, "The maximum minting amount is 50.");
        //No se puede tener mas del maxMintAmount en la wallet
        require(_mintAmount + balanceOf(msg.sender, XCPasses) <= maxMintAmount, "You cant have more than 50 NFTs in your wallet.");
        //No se puede mintear si no quedan suficientes NFTs
        require(totalSupply(XCPasses) + _mintAmount <= maxSupply, "There are not enough NFTs left.");

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
        _mint(_to, XCPasses, _mintAmount, "");
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

      //Funcion para cambiar el precio de venta
    function setCost(uint256 _newCost) public onlyOwner {
        cost = _newCost;
    }

    //Funcion para definir el supply maximo
    function setmaxSupply(uint256 _newmaxSupply) public onlyOwner {
        maxSupply = _newmaxSupply;
    }

    //Funcion para definir el maximo numero de minteos por wallet
    function setmaxMintAmount(uint256 _newmaxMintAmount) public onlyOwner {
        maxMintAmount = _newmaxMintAmount;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
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

    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        whenNotPaused
        override(ERC1155, ERC1155Supply)
    {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}