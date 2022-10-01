//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract MoneyGifts {
    // 이벤트를 밑에서 emit 으로 실행시켜준다
    // 출력하고자 하는 타입지정
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );
    
    // 구조체 설정
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }
    
    // 해당주소에는 이더를 보낼수 있도록 payable 선언
    address payable owner;

    // 구조체로 빈배열 생성
    Memo[] memos;

    constructor() {
        owner = payable(msg.sender);
        // owner 를 msg.sender 주소로 초기화
        // 이더를 보낼수 있도록 payable 으로 감싼 주소(msg.sender)
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
        // 배열값 리턴
    }

    function GiftsMeg(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "congratulate me soon!");
        // 잔고가 0보다 클 경우 아래 코드 실행 👉 아니면 에러

        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));
        // 배열에 구조체 순으로 push

        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        );
        // event로 지정된 타입대로 대입
    }

    function withdrawTips() public {
        require(owner.send(address(this).balance));
        
        // 축하받는 주인에게 이더 송금
        // 쌓여있는 잔고를 컨트랙트 배포자에게 송금
        // 누구나 호출할 수 있지만 컨트랙트 배포자에게만 돈을 보낼 수 있는 기능
    }
}