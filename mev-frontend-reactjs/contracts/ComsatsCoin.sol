// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ComsatsCoin{
    string public name = 'Comsats Coin';
    string public symbol = 'CC';
    string public standard = 'comsatsCoin v.0.1';
    uint256 public totalSupply;
    address public owner;
    uint256 public _userId;

    address[] public holderToken;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );


    mapping(address => TokenHolderInfo) public tokenHolderInfos;

    struct TokenHolderInfo{
        uint256 _tokenId;
        address _from;
        address _to;
        uint256 _totalToken;
        bool _tokenHolder;
    }


    mapping(address => uint256) public balanceOf;
    mapping (address=>mapping(address => uint256)) public allownce;


    constructor(uint256 _initialSupply){
        owner = msg.sender;
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }


    //--Functions

    function inc() internal{
        _userId++;
    }

    function transfer(address _to, uint256 _value) public returns(bool success){
        require(balanceOf[msg.sender] >= _value);
        inc();

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        TokenHolderInfo storage tokenHolderInfo = tokenHolderInfos[_to];

        tokenHolderInfo._to = _to;
        tokenHolderInfo._from = msg.sender;
        tokenHolderInfo._tokenHolder = true;
        tokenHolderInfo._totalToken = _value;
        tokenHolderInfo._tokenId = _userId;

        holderToken.push(_to);

        emit Transfer(msg.sender, _to, _value);

        return true;

    }

    function transferFrom(address _from, address _to, uint256 _value) public returns(bool success){
        require(balanceOf[_from] >= _value);
        require(allownce[_from][msg.sender] >= _value);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(_from, _to, _value);

        return true;
    }


    function buyToken(uint256 _value) public returns(bool success){
        require(balanceOf[msg.sender] >= _value);
        inc();

        balanceOf[msg.sender] -= _value;
        balanceOf[owner] += _value;

        TokenHolderInfo storage tokenHolderInfo = tokenHolderInfos[owner];

        tokenHolderInfo._to = owner;
        tokenHolderInfo._from = msg.sender;
        tokenHolderInfo._tokenHolder = true;
        tokenHolderInfo._totalToken = _value;
        tokenHolderInfo._tokenId = _userId;

        holderToken.push(owner);

        emit Transfer(msg.sender, owner, _value);

        return true;
    }


    function mint(uint256 tokensToMint) public {
        require(msg.sender == owner, "Only Owner can mint more tokens");
        balanceOf[owner] += tokensToMint;
        totalSupply += tokensToMint;
    }


    function getTokenHolderData(address _address) public view returns(
        uint256, address, address, uint256, bool
    ){
        return(
            tokenHolderInfos[_address]._tokenId,
            tokenHolderInfos[_address]._to,
            tokenHolderInfos[_address]._from,
            tokenHolderInfos[_address]._totalToken,
            tokenHolderInfos[_address]._tokenHolder
        );
    }

    function getTokenHolder() public view returns(address[] memory){
        return holderToken;
    }
}