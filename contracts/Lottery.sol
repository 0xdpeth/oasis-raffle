pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address public prevWinner;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value == .001 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint256) {
        return uint256(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public {
        uint256 index = random() % players.length;
        players[index].transfer(this.balance);
        prevWinner = players[index];
        players = new address[](0);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

    function getPrevWinner() public view returns (address) {
        return prevWinner;
    }
}
