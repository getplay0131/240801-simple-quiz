// 작업 완료
document.addEventListener("DOMContentLoaded", () => {
  // 1. 퀴즈 데이터 배열 생성
  // 힌트: 각 퀴즈 객체는 질문, 선택지 배열, 정답 인덱스를 포함해야 합니다
  // 예: { question: "질문", choices: ["선택지1", "선택지2", "선택지3", "선택지4"], correctAnswer: 0 }
  const quizData = [
    // 퀴즈 데이터를 여기에 추가하세요
    {
      퀴즈: "가수 샤이니가 다니는 고등학교는?",
      정답: ["아미고", "SM고"],
      답안: 0,
    },
    {
      퀴즈: "간짜장이 일반 짜장보다 비싼 이유는?",
      정답: ["재료가 좋아서", "간 때문이야"],
      답안: 1,
    },
    {
      퀴즈: "간첩이 동물원에 가면 찾는 새는?",
      정답: ["공작새", "독수리"],
      답안: 0,
    },
    {
      퀴즈: "강아지의 생일을 영어로 하면?",
      정답: ["퍼피 버스데이 투 유", "해피 버스데이 투 유"],
      답안: 1,
    },
    {
      퀴즈: "개가 사람을 가르친다'를 네 글자로 하면?",
      정답: ["개인교습", "개인지도"],
      답안: 1,
    },
    {
      퀴즈: "개미가 사는 집 주소는?",
      정답: ["허리도 가늘군 만지면 부러지리", "땅속마을"],
      답안: 0,
    },
    {
      퀴즈: "개성공단의 반대말은?",
      정답: ["고양이실패단", "폐쇄공단"],
      답안: 0,
    },
    {
      퀴즈: "거북하고 공룡은 파충류, 원숭이하고 사람은 포유류, 개구리하고 도롱뇽은 양서류다. 그렇다면 오징어하고 쥐치는?",
      정답: ["안주류", "어류"],
      답안: 0,
    },
    {
      퀴즈: "겨울에 설경이 아름다운 섬은?",
      정답: ["태권도", "설운도"],
      답안: 1,
    },
    {
      퀴즈: "금은 금인데 도둑고양이에게 가장 잘 어울리는 금은?",
      정답: ["야금야금", "순금"],
      답안: 0,
    },
  ];

  // 2. 필요한 DOM 요소들을 선택하세요
  // 힌트: document.getElementById()를 사용하여 퀴즈 컨테이너, 질문 요소, 선택지 컨테이너, 다음 버튼, 결과 요소를 선택하세요
  const quizContain = document.getElementById("quizContainer");
  const ques = document.getElementById("question");
  const answer = document.getElementById("answer");
  const nextBtn = document.getElementById("next");
  const preBtn = document.getElementById("previous");
  const hintBtn = document.getElementById("hint");
  // 힌트 버튼 클릭시 힌트 요청이라는 글씨 대신 힌트 표기
  const resultDis = document.getElementById("result");
  const btnSection = document.getElementById("btnSection");

  // 3. 전역 변수 설정
  // 힌트: 현재 퀴즈 인덱스와 점수를 추적할 변수가 필요합니다
  // 3. 전역 변수 설정
  // const를 let으로 변경해야 합니다. 값이 변경되는 변수이므로 const 대신 let을 사용해야 합니다.
  let quizsIndex = 0;
  let resultScore = 0;

  // 4. 퀴즈 시작 함수 생성
  // 힌트: 이 함수는 첫 번째 질문을 로드하고 표시해야 합니다

  // 6. 선택지 체크 함수 생성
  // 힌트: 이 함수는 사용자가 선택한 답변이 정답인지 확인하고 점수를 업데이트해야 합니다
  // 추가 힌트:
  // - 이벤트 객체(e)를 매개변수로 받아 e.target으로 클릭된 버튼을 식별하세요
  // - 클릭된 버튼의 텍스트와 현재 퀴즈의 정답을 비교하세요
  // - 정답이면 점수를 증가시키고, 버튼에 'correct' 클래스를 추가하세요
  // - 오답이면 'incorrect' 클래스를 추가하세요
  // - 모든 버튼을 비활성화하고, 정답 버튼에 'correct' 클래스를 추가하세요
  // - 다음 버튼을 표시하세요

  // 함수 이름을 selectAnswer로 변경해야 합니다 (showQuiz 함수에서 사용한 이름과 일치시키기 위해).
  // 매개변수 e를 추가해야 합니다.
  // answerBtn 선언을 함수 내부로 옮겨야 합니다.
  // NowQuiz를 quizData[quizsIndex]로 변경해야 합니다.
  // 정답 체크 로직을 수정해야 합니다.
  // 모든 버튼을 비활성화하는 로직을 추가해야 합니다.
  function answerCheck(e) {
    console.log("답변 체크 시작");
    const userChoiceBtn = e.target;
    const userAnswer = parseInt(userChoiceBtn.dataset.index);
    const correctAnswer = quizData[quizsIndex].답안;
    // const answerBtn = document.querySelectorAll("#answer button");
    if (userAnswer === correctAnswer) {
      console.log("정답 선택");
      resultScore++;
      userChoiceBtn.classList.add("correct");
      resultDis.innerHTML = "정답입니다!";
      disableButtons();
      nextBtn.style.display = "block";
    } else {
      userChoiceBtn.classList.add("incorrect");
      resultDis.innerHTML = "오답입니다! 다시 선택해주세요!";
      userChoiceBtn.disabled = true; //오답버튼만 비활성화

      // 오답 선택시 다시 풀기 버튼 표시
      if (!document.querySelector("#btnSection .retryBtn")) {
        const retryBtn = document.createElement("button");
        retryBtn.innerHTML = "다시 풀기";
        retryBtn.classList.add("retryBtn");
        retryBtn.addEventListener("click", retryQuestion);
        btnSection.insertBefore(retryBtn, btnSection.firstChild);
      }
    }

    // 모든 버튼 비활성화
    const buttons = answer.querySelectorAll("button");
    buttons.forEach((button) => {
      button.disabled = true;
      if (parseInt(button.dataset.index) === correctAnswer) {
        button.classList.add("correct");
      }
    });
    // answerBtn.disabled = true;
    // userChoiceBtn.classList.add("correct");
    nextBtn.style.display = "block";
  }

  // 6. 상태 초기화 함수
  // resetState 함수에서 while 루프 조건을 수정해야 합니다.
  function resetState() {
    nextBtn.style.display = "none";
    while (answer.firstChild) {
      answer.removeChild(answer.firstChild);
    }
    resultDis.innerHTML = "";

    // 다시 풀기 버튼이 있다면 제거
    const retryBtn = document.querySelector("#btnSection button:last-child");
    if (retryBtn && retryBtn.innerHTML === "다시 풀기") {
      retryBtn.remove();
    }
  }

  // 7. 다음 질문 로드 함수 생성
  // 힌트: 이 함수는 다음 질문으로 넘어가거나 퀴즈를 종료해야 합니다
  // - 현재 퀴즈 인덱스를 증가시키고, 모든 질문을 답했는지 확인하세요
  // - 모든 질문에 답했다면 결과를 표시하고, 그렇지 않다면 다음 질문을 로드하세요
  // 추가 힌트:
  // - quizsIndex를 1 증가시키세요
  // - if문을 사용하여 quizsIndex가 quizData.length보다 작은지 확인하세요
  // - 작다면 showQuiz() 함수를 호출하세요
  // - 그렇지 않다면 showScore() 함수를 호출하세요

  // 인덱스 증가 방식을 수정해야 합니다.
  function nextQuestion() {
    quizsIndex++;
    if (quizsIndex < quizData.length) {
      showQuiz();
    } else {
      showScore();
    }
  }

  // 8. 결과 표시 함수 생성
  // 힌트: 이 함수는 최종 점수를 계산하고 화면에 표시해야 합니다
  // - innerHTML을 사용하여 결과 텍스트를 설정하세요
  // 추가 힌트:
  // - resetState() 함수를 호출하여 이전 상태를 초기화하세요
  // - ques.innerHTML을 사용하여 최종 점수 메시지를 표시하세요
  // - nextBtn.innerHTML을 "다시 시작"으로 변경하세요
  // - nextBtn.style.display = "block"으로 다시 시작 버튼을 표시하세요

  // resetState 함수 호출을 추가해야 합니다.
  // 점수 표시 방식을 수정해야 합니다.
  // answerCheck 함수 호출을 제거해야 합니다.
  function showScore() {
    resetState();
    resultDis.innerHTML = `당신의 점수는 ${quizData.length}점 중 ${resultScore} 점 이네요!`;
    nextBtn.innerHTML = "다시 시작하기!";
    nextBtn.style.display = "block";
  }

  // 버튼 비활성화 함수
  function disableButtons() {
    const buttons = answer.querySelectorAll("button");
    buttons.forEach((button) => {
      button.disabled = true;
      if (parseInt(button.dataset.index) === quizData[quizsIndex].답안) {
        button.classList.add("correct");
      }
    });
  }

  // 다시 풀기 버튼 생성 함수
  function retryQuestion() {
    // 다시 풀기 버튼 제거
    const retryBtn = document.querySelector("#btnSection button.retry");
    if (retryBtn) {
      retryBtn.remove();
    }
    // 오답으로 표시된 버튼을 초기화
    const buttons = answer.querySelectorAll("button");
    buttons.forEach((button) => {
      button.disabled = false;
      button.classList.remove("incorrect");
    });
    // 결과 메시지 초기화
    resultDis.innerHTML = "";
  }

  function quizStart() {
    // 첫번째 질문을 가져오기
    // quizsIndex와 resultScore에 값을 할당할 때 let으로 선언하거나 기존 변수에 재할당해야 합니다.
    // 2차// quizStart 함수에서 전역 변수를 재할당하도록 수정해야 합니다.
    quizsIndex = 0;
    resultScore = 0;
    nextBtn.innerHTML = "다음 퀴즈 보기!";
    // 질문을 표시하기
    showQuiz();
  }

  // 5. 질문 로드 함수 생성
  // 힌트: 이 함수는 현재 퀴즈 인덱스에 해당하는 질문과 선택지를 화면에 표시해야 합니다
  // - innerHTML을 사용하여 질문 텍스트를 설정하세요
  // - 선택지 버튼을 동적으로 생성하고, 각 버튼에 클릭 이벤트 리스너를 추가하세요
  // questionNo 계산 방식을 수정해야 합니다. NowQuiz는 객체이므로 +1을 할 수 없습니다.
  function showQuiz() {
    resetState();
    // 변수에 퀴즈 데이터에 인덱스 담기
    // showQuiz 함수에서 버튼 생성 로직을 수정해야 합니다.
    let NowQuiz = quizData[quizsIndex];
    let questionNo = quizsIndex + 1;
    ques.innerHTML = questionNo + ". " + NowQuiz.퀴즈;

    NowQuiz.정답.forEach((ans, i) => {
      const btn = document.createElement("button");
      btn.innerHTML = ans;
      btn.classList.add("btn");
      answer.appendChild(btn);
      // 각 버튼에 데이터 속성을 추가하여 인덱스를 저장하세요.
      btn.dataset.index = i;
      btn.addEventListener("click", answerCheck);
    });
  }

  //   6번부터 추가 힌트 요청하여 작성 진행.
  // 5번은 ai 도움 받음

  // 9. 이벤트 리스너 추가
  // 힌트: 페이지 로드 시 퀴즈를 시작하고, 다음 버튼 클릭 시 다음 질문을 로드하세요
  // - window.addEventListener('load', 함수명)을 사용하여 페이지 로드 이벤트를 처리하세요
  // - 다음 버튼에 클릭 이벤트 리스너를 추가하세요
  // 추가 힌트:
  // - nextBtn.addEventListener("click", 함수)를 사용하세요
  // - 클릭 이벤트 핸들러 함수 내에서 quizsIndex가 quizData.length보다 작은지 확인하세요
  // - 작다면 handleNextButton() 함수를 호출하고, 그렇지 않다면 startQuiz() 함수를 호출하세요
  // - 마지막으로 quizStart() 함수를 호출하여 퀴즈를 시작하세요

  // load 이벤트 리스너에서 함수 호출 방식을 수정해야 합니다.
  // 마지막 quizStart() 호출을 제거해야 합니다.
  window.addEventListener("load", quizStart);
  nextBtn.addEventListener("click", () => {
    if (quizsIndex < quizData.length - 1) {
      nextQuestion();
    } else {
      showScore();
    }
  });
  // 이전 버튼과 힌트 버튼에 대한 이벤트 리스너를 추가해야 합니다.
  document.getElementById("previous").addEventListener("click", () => {
    if (quizsIndex > 0) {
      quizsIndex--;
      showQuiz();
    }
  });
  document.getElementById("hint").addEventListener("click", () => {
    alert("힌트: 답은 이 퀴즈에 주제인 넌센스라는것을 기억해주세요!");
  });
});
